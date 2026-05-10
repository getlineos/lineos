import crypto from "node:crypto";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "./db.mjs";
import { deleteImageByUrl, uploadImage } from "./storage.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const port = Number(process.env.CORE_API_PORT ?? 5177);
const sessionCookieName = "lineos_session";
const authSecret = process.env.AUTH_SECRET ?? "lineos-dev-secret";

const appColumns = [
	"name",
	"subtitle",
	"description",
	"primary_category",
	"subcategory",
	"keywords",
	"support_url",
	"privacy_policy_url",
	"contact_email",
	"app_url",
	"icon_url",
	"pricing_model",
	"price",
	"currency",
	"release_type",
	"scheduled_release_date",
	"is_preorder",
	"age_rating",
	"content_descriptors",
	"review_notes",
	"status",
	"slug",
];

const profileColumns = [
	"developer_status",
	"first_name",
	"last_name",
	"avatar_url",
];

const ageRatingFromApi = {
	"4+": "four_plus",
	"9+": "nine_plus",
	"12+": "twelve_plus",
	"17+": "seventeen_plus",
};

const ageRatingToApi = Object.fromEntries(
	Object.entries(ageRatingFromApi).map(([apiValue, prismaValue]) => [
		prismaValue,
		apiValue,
	])
);

function pick(data, allowedColumns) {
	return Object.fromEntries(
		Object.entries(data).filter((entry) => allowedColumns.includes(entry[0]))
	);
}

function normalizeEmpty(value) {
	return value === "" ? null : value;
}

function normalizeAppData(data) {
	const appData = pick(data, appColumns);

	if (appData.age_rating) {
		appData.age_rating = ageRatingFromApi[appData.age_rating] ?? appData.age_rating;
	}

	for (const key of [
		"price",
		"currency",
		"scheduled_release_date",
		"content_descriptors",
		"review_notes",
		"subtitle",
		"subcategory",
	]) {
		if (key in appData) {
			appData[key] = normalizeEmpty(appData[key]);
		}
	}

	return appData;
}

function formatApp(app) {
	if (!app) {
		return app;
	}

	return {
		...app,
		age_rating: ageRatingToApi[app.age_rating] ?? app.age_rating,
	};
}

function parseIntegerId(value) {
	const id = Number(value);
	return Number.isInteger(id) && id > 0 ? id : null;
}

async function canReadApp(appId, user) {
	const app = await prisma.app.findFirst({
		where: {
			id: appId,
			OR: user
				? [{ user_id: user.id }, { status: "approved" }]
				: [{ status: "approved" }],
		},
		select: { id: true },
	});

	return Boolean(app);
}

function sendJson(res, status, body, headers = {}) {
	res.writeHead(status, {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store",
		...headers,
	});
	res.end(JSON.stringify(body));
}

function sendError(res, status, message) {
	sendJson(res, status, { error: message });
}

function readBody(req) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		req.on("data", (chunk) => chunks.push(chunk));
		req.on("end", () => resolve(Buffer.concat(chunks)));
		req.on("error", reject);
	});
}

async function readJson(req) {
	if (req.body !== undefined && req.body !== null) {
		if (typeof req.body === "string") {
			return req.body ? JSON.parse(req.body) : {};
		}

		if (Buffer.isBuffer(req.body)) {
			return req.body.length ? JSON.parse(req.body.toString("utf8")) : {};
		}

		return req.body;
	}

	const body = await readBody(req);
	if (body.length === 0) {
		return {};
	}

	return JSON.parse(body.toString("utf8"));
}

function getHeaderEntries(headers) {
	return Object.entries(headers).flatMap(([key, value]) => {
		if (Array.isArray(value)) {
			return value.map((item) => [key, item]);
		}

		if (value === undefined) {
			return [];
		}

		return [[key, value]];
	});
}

function getRequestBody(req) {
	if (req.body !== undefined && req.body !== null) {
		return req.body;
	}

	return req;
}

async function readFormData(req, pathname) {
	const webRequest = new Request(`http://127.0.0.1:${port}${pathname}`, {
		method: req.method,
		headers: getHeaderEntries(req.headers),
		body: getRequestBody(req),
		duplex: "half",
	});

	return webRequest.formData();
}

function parseCookies(req) {
	const header = req.headers.cookie ?? "";
	return Object.fromEntries(
		header
			.split(";")
			.map((part) => part.trim())
			.filter(Boolean)
			.map((part) => {
				const separator = part.indexOf("=");
				return [
					decodeURIComponent(part.slice(0, separator)),
					decodeURIComponent(part.slice(separator + 1)),
				];
			})
	);
}

function sign(value) {
	return crypto
		.createHmac("sha256", authSecret)
		.update(value)
		.digest("base64url");
}

function createSessionToken(userId) {
	const payload = Buffer.from(
		JSON.stringify({ userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 14 })
	).toString("base64url");
	return `${payload}.${sign(payload)}`;
}

function readSessionToken(token) {
	if (!token) {
		return null;
	}

	const [payload, signature] = token.split(".");
	if (!payload || !signature || sign(payload) !== signature) {
		return null;
	}

	const session = JSON.parse(
		Buffer.from(payload, "base64url").toString("utf8")
	);
	if (session.exp < Date.now()) {
		return null;
	}

	return session;
}

async function getCurrentUser(req) {
	const token = parseCookies(req)[sessionCookieName];
	const session = readSessionToken(token);
	if (!session) {
		return null;
	}

	const user = await prisma.users.findUnique({
		where: { id: session.userId },
		select: {
			id: true,
			email: true,
			profile: {
				select: {
					first_name: true,
					last_name: true,
					avatar_url: true,
				},
			},
		},
	});

	if (!user) {
		return null;
	}

	return {
		id: user.id,
		email: user.email,
		user_metadata: {
			first_name: user.profile?.first_name ?? null,
			last_name: user.profile?.last_name ?? null,
			avatar_url: user.profile?.avatar_url ?? null,
		},
	};
}

async function requireUser(req, res) {
	const user = await getCurrentUser(req);
	if (!user) {
		sendError(res, 401, "Not authenticated");
		return null;
	}

	return user;
}

function hashPassword(
	password,
	salt = crypto.randomBytes(16).toString("base64url")
) {
	const hash = crypto
		.pbkdf2Sync(password, salt, 210000, 64, "sha512")
		.toString("base64url");
	return { hash, salt };
}

function createAuthResponse(user) {
	const session = {
		user,
		access_token: "cookie",
		token_type: "bearer",
	};

	return { user, session };
}

function getSetCookie(value, maxAge = 60 * 60 * 24 * 14) {
	return `${sessionCookieName}=${encodeURIComponent(
		value
	)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

async function handleAuth(req, res, pathname) {
	if (req.method === "GET" && pathname === "/api/auth/session") {
		const user = await getCurrentUser(req);
		sendJson(res, 200, {
			session: user ? createAuthResponse(user).session : null,
		});
		return true;
	}

	if (req.method === "POST" && pathname === "/api/auth/signup") {
		const { email, password, first_name, last_name, avatar_url } =
			await readJson(req);
		if (!email || !password) {
			sendError(res, 400, "Email and password are required");
			return true;
		}

		const { hash, salt } = hashPassword(password);
		let createdUser;
		try {
			createdUser = await prisma.users.create({
				data: {
					email,
					password_hash: hash,
					password_salt: salt,
					profile: {
						create: {
							first_name: first_name ?? null,
							last_name: last_name ?? null,
							avatar_url: avatar_url ?? null,
						},
					},
				},
				select: {
					id: true,
					email: true,
					profile: {
						select: {
							first_name: true,
							last_name: true,
							avatar_url: true,
						},
					},
				},
			});
		} catch (error) {
			if (error?.code === "P2002") {
				sendError(res, 409, "An account with this email already exists");
				return true;
			}

			throw error;
		}
		const user = {
			id: createdUser.id,
			email: createdUser.email,
			user_metadata: {
				first_name: createdUser.profile?.first_name ?? null,
				last_name: createdUser.profile?.last_name ?? null,
				avatar_url: createdUser.profile?.avatar_url ?? null,
			},
		};

		const token = createSessionToken(user.id);
		sendJson(res, 200, createAuthResponse(user), {
			"Set-Cookie": getSetCookie(token),
		});
		return true;
	}

	if (req.method === "POST" && pathname === "/api/auth/signin") {
		const { email, password } = await readJson(req);
		const row = await prisma.users.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				password_hash: true,
				password_salt: true,
				profile: {
					select: {
						first_name: true,
						last_name: true,
						avatar_url: true,
					},
				},
			},
		});

		if (!row) {
			sendError(res, 401, "Invalid email or password");
			return true;
		}

		const { hash } = hashPassword(password, row.password_salt);
		if (
			!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(row.password_hash))
		) {
			sendError(res, 401, "Invalid email or password");
			return true;
		}

		const user = {
			id: row.id,
			email: row.email,
			user_metadata: {
				first_name: row.profile?.first_name ?? null,
				last_name: row.profile?.last_name ?? null,
				avatar_url: row.profile?.avatar_url ?? null,
			},
		};
		const token = createSessionToken(user.id);
		sendJson(res, 200, createAuthResponse(user), {
			"Set-Cookie": getSetCookie(token),
		});
		return true;
	}

	if (req.method === "POST" && pathname === "/api/auth/signout") {
		sendJson(res, 200, { ok: true }, { "Set-Cookie": getSetCookie("", 0) });
		return true;
	}

	return false;
}

async function handleProfiles(req, res, pathname) {
	const match = pathname.match(/^\/api\/profiles\/([^/]+)$/);
	if (!match) {
		return false;
	}

	const user = await requireUser(req, res);
	if (!user) {
		return true;
	}

	const userId = Number(match[1]);
	if (!Number.isInteger(userId)) {
		sendError(res, 400, "Invalid user id");
		return true;
	}
	if (user.id !== userId) {
		sendError(res, 403, "Cannot access another user's profile");
		return true;
	}

	if (req.method === "GET") {
		const profile = await prisma.profile.findUnique({ where: { id: userId } });
		sendJson(res, 200, profile);
		return true;
	}

	if (req.method === "PATCH") {
		const updates = await readJson(req);
		const data = pick(updates, profileColumns);
		if (Object.keys(data).length === 0) {
			sendError(res, 400, "No valid fields to update");
			return true;
		}

		const profile = await prisma.profile.update({
			where: { id: userId },
			data,
		});
		sendJson(res, 200, profile);
		return true;
	}

	return false;
}

async function handleApps(req, res, pathname, searchParams) {
	const user = await getCurrentUser(req);

	if (req.method === "GET" && pathname === "/api/apps") {
		const status = searchParams.get("status");
		if (status !== "approved" && !user) {
			sendError(res, 401, "Not authenticated");
			return true;
		}

		const rows = await prisma.app.findMany({
			where: status ? { status } : { user_id: user.id },
			orderBy: { created_at: "desc" },
		});
		sendJson(res, 200, rows.map(formatApp));
		return true;
	}

	const appMatch = pathname.match(/^\/api\/apps\/([^/]+)$/);
	if (appMatch) {
		const appId = parseIntegerId(appMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}

		if (req.method === "GET") {
			const app = await prisma.app.findFirst({
				where: {
					id: appId,
					OR: user
						? [{ user_id: user.id }, { status: "approved" }]
						: [{ status: "approved" }],
				},
			});
			if (!app) {
				sendError(res, 404, "App not found");
				return true;
			}
			sendJson(res, 200, formatApp(app));
			return true;
		}
	}

	const publicAssetsMatch = pathname.match(/^\/api\/apps\/([^/]+)\/assets$/);
	if (publicAssetsMatch && req.method === "GET") {
		const appId = parseIntegerId(publicAssetsMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}
		if (!(await canReadApp(appId, user))) {
			sendError(res, 404, "App not found");
			return true;
		}

		const rows = await prisma.appAsset.findMany({
			where: { app_id: appId },
		});
		sendJson(res, 200, rows);
		return true;
	}

	const publicTerritoriesMatch = pathname.match(
		/^\/api\/apps\/([^/]+)\/territories$/
	);
	if (publicTerritoriesMatch && req.method === "GET") {
		const appId = parseIntegerId(publicTerritoriesMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}
		if (!(await canReadApp(appId, user))) {
			sendError(res, 404, "App not found");
			return true;
		}

		const rows = await prisma.appTerritory.findMany({
			where: { app_id: appId },
		});
		sendJson(res, 200, rows);
		return true;
	}

	const publicReviewsMatch = pathname.match(/^\/api\/apps\/([^/]+)\/reviews$/);
	if (publicReviewsMatch && req.method === "GET") {
		const appId = parseIntegerId(publicReviewsMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}
		if (!(await canReadApp(appId, user))) {
			sendError(res, 404, "App not found");
			return true;
		}

		const rows = await prisma.appReview.findMany({
			where: { app_id: appId },
			orderBy: { created_at: "desc" },
		});
		sendJson(res, 200, rows);
		return true;
	}

	if (!user) {
		sendError(res, 401, "Not authenticated");
		return true;
	}

	if (req.method === "POST" && pathname === "/api/apps") {
		const body = await readJson(req);
		const data = normalizeAppData(body);
		data.content_descriptors ??= [];
		const app = await prisma.app.create({
			data: {
				...data,
				user_id: user.id,
			},
		});
		sendJson(res, 201, formatApp(app));
		return true;
	}

	if (appMatch) {
		const appId = parseIntegerId(appMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}

		if (req.method === "PATCH") {
			const body = await readJson(req);
			const data = normalizeAppData(body);
			if (Object.keys(data).length === 0) {
				sendError(res, 400, "No valid fields to update");
				return true;
			}

			const update = await prisma.app.updateMany({
				where: {
					id: appId,
					user_id: user.id,
				},
				data,
			});
			if (update.count === 0) {
				sendError(res, 404, "App not found");
				return true;
			}
			const app = await prisma.app.findUnique({ where: { id: appId } });
			sendJson(res, 200, formatApp(app));
			return true;
		}
	}

	const assetsMatch = pathname.match(/^\/api\/apps\/([^/]+)\/assets$/);
	if (assetsMatch) {
		const appId = parseIntegerId(assetsMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}

		if (req.method === "GET") {
			const rows = await prisma.appAsset.findMany({
				where: { app_id: appId },
			});
			sendJson(res, 200, rows);
			return true;
		}

		if (req.method === "POST") {
			const app = await prisma.app.findFirst({
				where: { id: appId, user_id: user.id },
				select: { id: true },
			});
			if (!app) {
				sendError(res, 404, "App not found");
				return true;
			}

			const { assetType, filePath, fileSize, width, height } = await readJson(req);
			if (typeof assetType !== "string" || typeof filePath !== "string") {
				sendError(res, 400, "assetType and filePath are required");
				return true;
			}

			const asset = await prisma.appAsset.create({
				data: {
					app_id: appId,
					asset_type: assetType,
					file_path: filePath,
					file_size: Number.isFinite(fileSize) ? fileSize : 0,
					width: Number.isFinite(width) ? width : null,
					height: Number.isFinite(height) ? height : null,
				},
			});
			sendJson(res, 201, asset);
			return true;
		}
	}

	const territoriesMatch = pathname.match(
		/^\/api\/apps\/([^/]+)\/territories$/
	);
	if (territoriesMatch) {
		const appId = parseIntegerId(territoriesMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}
		if (req.method === "GET") {
			const rows = await prisma.appTerritory.findMany({
				where: { app_id: appId },
			});
			sendJson(res, 200, rows);
			return true;
		}

		if (req.method === "POST") {
			const { territoryCodes } = await readJson(req);
			const rows = await prisma.$transaction(
				(territoryCodes ?? []).map((code) =>
					prisma.appTerritory.upsert({
						where: {
							app_id_territory_code: {
								app_id: appId,
								territory_code: code,
							},
						},
						create: {
							app_id: appId,
							territory_code: code,
						},
						update: {
							territory_code: code,
						},
					})
				)
			);
			sendJson(res, 201, rows);
			return true;
		}

		if (req.method === "DELETE") {
			const { territoryCodes } = await readJson(req);
			await prisma.appTerritory.deleteMany({
				where: {
					app_id: appId,
					territory_code: { in: territoryCodes ?? [] },
				},
			});
			sendJson(res, 200, { ok: true });
			return true;
		}
	}

	const reviewsMatch = pathname.match(/^\/api\/apps\/([^/]+)\/reviews$/);
	if (reviewsMatch) {
		const appId = parseIntegerId(reviewsMatch[1]);
		if (!appId) {
			sendError(res, 400, "Invalid app id");
			return true;
		}
		if (req.method === "GET") {
			const rows = await prisma.appReview.findMany({
				where: { app_id: appId },
				orderBy: { created_at: "desc" },
			});
			sendJson(res, 200, rows);
			return true;
		}

		if (req.method === "POST") {
			const { status, feedback } = await readJson(req);
			const row = await prisma.appReview.create({
				data: {
					app_id: appId,
					reviewer_id: user.id,
					status,
					feedback: feedback ?? null,
				},
			});
			sendJson(res, 201, row);
			return true;
		}
	}

	const assetMatch = pathname.match(/^\/api\/assets\/([^/]+)$/);
	if (assetMatch && req.method === "DELETE") {
		const assetId = parseIntegerId(assetMatch[1]);
		if (!assetId) {
			sendError(res, 400, "Invalid asset id");
			return true;
		}
		const asset = await prisma.appAsset
			.delete({ where: { id: assetId } })
			.catch(() => null);
		if (asset?.file_path) {
			await deleteImageByUrl(asset.file_path, rootDir);
		}
		sendJson(res, 200, { ok: true });
		return true;
	}

	return false;
}

async function handleUploads(req, res, pathname) {
	if (
		req.method === "DELETE" &&
		(pathname === "/api/uploads/app-icons" ||
			pathname === "/api/uploads/app-images")
	) {
		const user = await requireUser(req, res);
		if (!user) {
			return true;
		}

		const { url } = await readJson(req);
		if (typeof url === "string") {
			await deleteImageByUrl(url, rootDir);
		}

		sendJson(res, 200, { ok: true });
		return true;
	}

	if (
		req.method !== "POST" ||
		(pathname !== "/api/uploads/app-icons" &&
			pathname !== "/api/uploads/app-images" &&
			pathname !== "/api/uploads/app-assets")
	) {
		return false;
	}

	const user = await requireUser(req, res);
	if (!user) {
		return true;
	}

	const formData = await readFormData(req, pathname);
	const file = formData.get("file");
	if (!file || typeof file === "string") {
		sendError(res, 400, "File is required");
		return true;
	}
	if (!file.type.match(/^image\/(jpeg|png|webp|gif)$/)) {
		sendError(res, 400, "Only image files are allowed");
		return true;
	}

	const upload = await uploadImage({
		buffer: Buffer.from(await file.arrayBuffer()),
		contentType: file.type,
		fileName: file.name,
		rootDir,
		prefix: pathname === "/api/uploads/app-icons" ? "icon" : "asset",
	});

	if (pathname === "/api/uploads/app-assets") {
		const appId = parseIntegerId(formData.get("appId"));
		const assetType = formData.get("assetType");
		if (!appId || typeof assetType !== "string") {
			sendError(res, 400, "appId and assetType are required");
			return true;
		}

		const asset = await prisma.appAsset.create({
			data: {
				app_id: appId,
				asset_type: assetType,
				file_path: upload.url,
				file_size: file.size,
			},
		});
		sendJson(res, 201, asset);
		return true;
	}

	sendJson(res, 201, { url: upload.url, provider: upload.driver });
	return true;
}

export async function handleRequest(req, res) {
	try {
		const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

		if (req.method === "GET" && url.pathname === "/api/health") {
			sendJson(res, 200, { ok: true });
			return;
		}

		if (await handleAuth(req, res, url.pathname)) return;
		if (await handleUploads(req, res, url.pathname)) return;
		if (await handleProfiles(req, res, url.pathname)) return;
		if (
			url.pathname.startsWith("/api/apps") ||
			url.pathname.startsWith("/api/assets")
		) {
			if (await handleApps(req, res, url.pathname, url.searchParams)) return;
		}

		sendError(res, 404, "Not found");
	} catch (error) {
		console.error(error);
		sendError(
			res,
			500,
			error instanceof Error ? error.message : "Server error"
		);
	}
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
	const server = http.createServer(handleRequest);

	server.listen(port, "127.0.0.1", () => {
		console.log(`[lineos-api] listening on http://127.0.0.1:${port}`);
	});
}

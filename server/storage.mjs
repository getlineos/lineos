import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const storageDriver = (process.env.FILE_STORAGE_DRIVER ?? "local").toLowerCase();

function getExtension(fileName, contentType) {
	const extension = fileName?.split(".").pop();
	if (extension && extension !== fileName) {
		return extension.toLowerCase();
	}

	return contentType?.split("/").pop()?.replace("jpeg", "jpg") ?? "bin";
}

function createObjectName(prefix, fileName, contentType) {
	return `${prefix}-${Date.now()}-${crypto
		.randomBytes(4)
		.toString("hex")}.${getExtension(fileName, contentType)}`;
}

async function uploadLocal({ buffer, contentType, fileName, uploadDir, prefix }) {
	await fs.mkdir(uploadDir, { recursive: true });
	const safeName = createObjectName(prefix, fileName, contentType);
	const diskPath = path.join(uploadDir, safeName);
	await fs.writeFile(diskPath, buffer);

	return {
		url: `/uploads/app-images/${safeName}`,
		storageKey: safeName,
		driver: "local",
	};
}

async function uploadImgbb({ buffer, contentType, fileName }) {
	const apiKey = process.env.IMGBB_API_KEY;
	if (!apiKey) {
		throw new Error("IMGBB_API_KEY is required when FILE_STORAGE_DRIVER=imgbb");
	}

	const body = new FormData();
	const blob = new Blob([buffer], {
		type: contentType || "application/octet-stream",
	});
	body.append("image", blob, fileName || "upload");

	const response = await fetch(
		`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
		{
			method: "POST",
			body,
		}
	);
	const payload = await response.json().catch(() => null);
	if (!response.ok || !payload?.success) {
		throw new Error(payload?.error?.message ?? "Failed to upload image to imgbb");
	}

	return {
		url: payload.data.display_url ?? payload.data.url,
		storageKey: payload.data.id ?? null,
		driver: "imgbb",
	};
}

async function uploadS3({ buffer, contentType, fileName, prefix }) {
	const bucket = process.env.S3_BUCKET;
	const region = process.env.S3_REGION ?? "us-east-1";
	if (!bucket) {
		throw new Error("S3_BUCKET is required when FILE_STORAGE_DRIVER=s3");
	}

	const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3").catch(
		() => {
			throw new Error(
				"@aws-sdk/client-s3 is required when FILE_STORAGE_DRIVER=s3"
			);
		}
	);

	const keyPrefix = process.env.S3_KEY_PREFIX ?? "app-images";
	const key = `${keyPrefix.replace(/\/+$/, "")}/${createObjectName(
		prefix,
		fileName,
		contentType
	)}`;
	const client = new S3Client({
		region,
		endpoint: process.env.S3_ENDPOINT || undefined,
		forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
	});

	await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: buffer,
			ContentType: contentType,
			ACL: process.env.S3_ACL || undefined,
		})
	);

	const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL?.replace(/\/+$/, "");
	return {
		url: publicBaseUrl
			? `${publicBaseUrl}/${key}`
			: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
		storageKey: key,
		driver: "s3",
	};
}

export async function uploadImage(options) {
	if (storageDriver === "imgbb") {
		return uploadImgbb(options);
	}

	if (storageDriver === "s3") {
		return uploadS3(options);
	}

	return uploadLocal(options);
}

export async function deleteImageByUrl(url, rootDir) {
	if (!url) {
		return;
	}

	if (
		url.startsWith("/uploads/app-images/") ||
		url.startsWith("/uploads/app-icons/")
	) {
		await fs.rm(path.join(rootDir, "public", url.slice(1)), { force: true });
	}
}

import { handleRequest } from "../server/index.mjs";

function getForwardedApiPath(req) {
	const url = new URL(req.url ?? "/", "http://127.0.0.1");
	const path = url.searchParams.get("path");

	if (!path) {
		return "/api";
	}

	return `/api/${path.replace(/^\/+/, "")}`;
}

export default async function handler(req, res) {
	const url = new URL(req.url ?? "/", "http://127.0.0.1");
	url.searchParams.delete("path");
	req.url = `${getForwardedApiPath(req)}${url.search}`;

	await handleRequest(req, res);
}

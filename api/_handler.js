import { handleRequest } from "../server/index.mjs";

export default async function handler(req, res) {
	await handleRequest(req, res);
}

export function withApiPath(getPathname) {
	return async function routeHandler(req, res) {
		const url = new URL(req.url ?? "/", "http://127.0.0.1");
		req.url = `${getPathname(req)}${url.search}`;
		await handleRequest(req, res);
	};
}

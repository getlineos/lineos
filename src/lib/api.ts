export async function apiRequest<T>(
	path: string,
	options: RequestInit = {}
): Promise<T> {
	const response = await fetch(path, {
		credentials: "include",
		headers:
			options.body instanceof FormData
				? options.headers
				: {
						"Content-Type": "application/json",
						...options.headers,
				  },
		...options,
	});

	if (!response.ok) {
		const payload = await response.json().catch(() => null);
		throw new Error(payload?.error ?? `Request failed with ${response.status}`);
	}

	return response.json();
}

export function toJsonBody(body: unknown) {
	return JSON.stringify(body);
}

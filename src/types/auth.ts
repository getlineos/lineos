export interface User {
	id: number;
	email?: string;
	user_metadata: {
		first_name?: string | null;
		last_name?: string | null;
		avatar_url?: string | null;
	};
}

export interface Session {
	user: User;
	access_token?: string;
	token_type?: string;
}

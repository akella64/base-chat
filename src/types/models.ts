export interface User {
	id: number;
	url?: string;
	username: string;
	password: string;
	email?: string;
	groups?: string[];
}

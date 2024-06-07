import { User } from './models';

export interface ApiResponse {
	count: number;
	next: string;
	previous: string;
	results: User[];
}

export interface Tokens {
	refresh: string;
	access: string;
}

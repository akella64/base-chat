import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import type { AxiosResponse, AxiosError } from 'axios';

import type { User as UserModel } from '../types/models';
import type { ApiResponse, Tokens } from '../types/responses';

import { getToken, removeToken, setToken } from '../utils/storageHelper';

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_API_BASE}/api`,
	headers: {
		Authorization: `Bearer ${getToken('access_token')}`,
	},
});

/* 

Users

*/
export const getUsers = async (): Promise<ApiResponse> => {
	const response: AxiosResponse<ApiResponse, UserModel[]> =
		await api.get('/users');

	return response.data;
};

export const createUser = async (user: UserModel) => {
	const response: AxiosResponse<UserModel> = await api.post('/users/', user);

	return response.data;
};

export const deleteUser = async (userId: number) => {
	const response: AxiosResponse = await api.delete(`/users/${userId}/`);

	return response.data;
};

export const updateUser = async (userId: number, userFields: UserModel) => {
	const response: AxiosResponse<UserModel> = await api.patch(
		`/users/${userId}/`,
		userFields,
	);

	return response.data;
};

/* 

Authentication

*/
export const checkAuth = async (token: string | null) => {
	if (token) {
		const response: AxiosResponse = await api.get('/check/');
		return response;
	} else {
		throw new Error('Token is empty');
	}
};

export const loginAuth = async (username: string, password: string) => {
	const response: AxiosResponse<Tokens> = await api.post(
		'/token/',
		{
			username,
			password,
		},
		{ withCredentials: true },
	);

	return response.data;
};

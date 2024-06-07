import { AxiosResponse } from 'axios';

import type { User as UserModel } from '../../types/models';
import type { ApiResponse } from '../../types/responses';

import { api } from '../constants';

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

import axios, { AxiosResponse } from 'axios';
import { User as UserModel } from '../types/models';
import { ApiResponse } from '../types/responses';

const _baseHost = import.meta.env.VITE_BACKEND_API_BASE;
const _token = import.meta.env.VITE_BACKEND_API_TOKEN;
const _authHeader = {
	headers: {
		Authorization: `Token ${_token}`,
	},
};

export const getUsers = async (): Promise<ApiResponse> => {
	const response: AxiosResponse<ApiResponse> = await axios.get(
		`${_baseHost}/api/users/`,
		_authHeader,
	);

	return response.data;
};

export const createUser = async (user: UserModel): Promise<UserModel> => {
	const response: AxiosResponse<UserModel> = await axios.post(
		`${_baseHost}/api/users/`,
		user,
		_authHeader,
	);

	return response.data;
};

export const deleteUser = async (userId: number): Promise<unknown> => {
	const response: AxiosResponse = await axios.delete(
		`${_baseHost}/api/users/${userId}/`,
		_authHeader,
	);

	return response.data;
};

export const updateUser = async (
	userId: number,
	userFields: UserModel,
): Promise<UserModel> => {
	const response: AxiosResponse<UserModel> = await axios.patch(
		`${_baseHost}/api/users/${userId}/`,
		userFields,
		_authHeader,
	);

	return response.data;
};

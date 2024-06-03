import axios, { AxiosResponse } from 'axios';
import { User } from '../types/models';

const _baseApiHost = import.meta.env.VITE_BACKEND_API_BASE;

export const getUsers = async (): Promise<User[]> => {
	const response: AxiosResponse<User[]> = await axios.get(
		`${_baseApiHost}/user/all`,
	);

	return response.data;
};

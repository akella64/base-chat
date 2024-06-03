import axios, { AxiosResponse } from 'axios';
import { User } from '../types/models';

const _baseApiHost = import.meta.env.VITE_BACKEND_API_BASE;
const _baseApiToken = import.meta.env.VITE_BACKEND_API_TOKEN;

const _requestBaseGetOptions = {
	method: 'GET',
	headers: { Authorization: `Token ${_baseApiToken}` },
};

export const getUsers = async (): Promise<User[]> => {
	const response: AxiosResponse<User[]> = await axios.get(
		`${_baseApiHost}/user/all`,
		_requestBaseGetOptions,
	);

	return response.data;
};

import { AxiosResponse } from 'axios';

import type { Tokens } from '../../types/responses';

import { api } from '../constants';

export const checkAuth = async (token: string | null) => {
	if (token) {
		const response: AxiosResponse = await api.get('/check/');
		return response;
	} else {
		throw new Error('Token is empty');
	}
};

export const loginAuth = async (username: string, password: string) => {
	const response: AxiosResponse<Tokens> = await api.post('/token/', {
		username,
		password,
	});

	return response.data;
};

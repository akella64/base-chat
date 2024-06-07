import axios from 'axios';

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_API_BASE}/api`,
	/* 	withCredentials: true, */
	headers: {
		Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
	},
});

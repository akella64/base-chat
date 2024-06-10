import axios from 'axios';

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_API_BASE}/api`,
	headers: {
		Authorization: `Bearer ${sessionStorage.getItem('access_token') || localStorage.getItem('access_token')}`,
	},
});

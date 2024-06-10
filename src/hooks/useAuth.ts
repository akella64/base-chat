import { useState, useEffect } from 'react';
import { checkAuth } from '../services/auth/queries';

export const useAuth = () => {
	const [isAuth, setIsAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAuthStatus = async () => {
			const token =
				sessionStorage.getItem('access_token') ||
				localStorage.getItem('access_token');

			if (!token) {
				setLoading(false);
				return;
			}

			try {
				const result = await checkAuth(token);

				if (result.status === 200) setIsAuth(true);
			} catch (error) {
				setIsAuth(false);
			} finally {
				setLoading(false);
			}
		};

		fetchAuthStatus();
	}, []);

	return { isAuth, loading };
};

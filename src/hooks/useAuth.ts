import { useState, useEffect } from 'react';
import { checkAuth } from '../services/auth/queries';

export const useAuth = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchAuthStatus = async () => {
			const token = sessionStorage.getItem('access_token');
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

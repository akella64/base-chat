export const getToken = (key: string): string | null => {
	return sessionStorage.getItem(key) || localStorage.getItem(key);
};

export const setToken = (key: string, token: string): void => {
	if (sessionStorage.getItem(key) !== null) {
		sessionStorage.setItem(key, token);
	} else if (localStorage.getItem(key) !== null) {
		localStorage.setItem(key, token);
	} else {
		// Default to localStorage if not found in either
		localStorage.setItem(key, token);
	}
};

export const removeToken = (key: string): void => {
	sessionStorage.removeItem(key);
	localStorage.removeItem(key);
};

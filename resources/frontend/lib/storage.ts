import { LOCAL_STORAGE_KEY } from '@/data/constants';

export const getToken = (): string | null => {
	let localStorageToken = localStorage.getItem(LOCAL_STORAGE_KEY.token);
	if (localStorageToken) return localStorageToken;
	else return null;
};

export const removeToken = () => {
	localStorage.removeItem(LOCAL_STORAGE_KEY.token);
};

export const saveToken = (token: string) => {
	localStorage.setItem(LOCAL_STORAGE_KEY.token, token);
};

export default {
	getToken,
	removeToken,
	saveToken,
};

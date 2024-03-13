import Axios, { AxiosInstance } from 'axios';
import storage from './storage';

// Configured axios instance
const api: AxiosInstance = Axios.create({
	baseURL: '/',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Attach authorization token to every request
api.interceptors.request.use(function (config) {
	const token = storage.getToken();
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

export default api;

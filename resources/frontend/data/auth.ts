import { Auth, ChangePasswordInput, EditUserInput, LoginInput, RegisterInput } from '@/types/auth';
import api from '@/lib/api';
import { ErrorResponse, User } from '@/types';

export const login = async (data: LoginInput): Promise<Auth> => {
	return api
		.post('/api/login', data)
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			throw {
				message: e?.response?.data?.message || 'Failed to login',
				errors: e?.response?.data?.errors || null,
			} as ErrorResponse;
		});
};

export const register = async (data: RegisterInput): Promise<Auth> => {
	return api
		.post('/api/register', data)
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			throw {
				message: e?.response?.data?.message || 'Failed to register',
				errors: e?.response?.data?.errors || null,
			} as ErrorResponse;
		});
};

export const logout = async (): Promise<void> => {
	return api
		.post('/api/logout')
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			throw {
				message: e?.response?.data?.message || 'Failed to logout',
				errors: e?.response?.data?.errors || null,
			} as ErrorResponse;
		});
};

export const getUser = async (): Promise<User> => {
	return api.get('/api/auth/me').then((res) => {
		return res.data.data;
	});
};

export const changePassword = async (data: ChangePasswordInput): Promise<any> => {
	return api
		.post('/api/auth/change-password', data)
		.then((res) => {
			return res.data.data;
		})
		.catch((e) => {
			throw {
				message: e?.response?.data?.message || 'Failed to change password',
				errors: e?.response?.data?.errors || null,
			} as ErrorResponse;
		});
};

export const editUser = async (data: EditUserInput): Promise<any> => {
	return api
		.post('/api/auth/edit', data)
		.then((res) => {
			return res.data.data;
		})
		.catch((e) => {
			throw {
				message: e?.response?.data?.message || 'Failed to change user parameters',
				errors: e?.response?.data?.errors || null,
			} as ErrorResponse;
		});
};

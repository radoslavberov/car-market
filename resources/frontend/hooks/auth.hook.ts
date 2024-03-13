import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/data/constants';
import storage from '@/lib/storage';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getUser, logout } from '@/data/auth';
import { Auth } from '@/types/auth';

export function useAuth() {
	const { data, isSuccess, ...rest } = useQuery<Auth>(
		[QUERY_KEY.auth],
		async (): Promise<Auth> => {
			if (!storage.getToken()) {
				return {
					user: null,
					token: null,
				};
			}
			const user = await getUser().catch((e) => {
				e.response.status === 401 && storage.removeToken();
				return null;
			});
			return {
				user: user,
				token: storage.getToken(),
			};
		},
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: 0,
			staleTime: 5 * 1000,
		},
	);

	return {
		user: data?.user || null,
		token: data?.token || null,
		isAuthenticated: isSuccess && !!data?.token,
		isSuccess,
		...rest,
	};
}

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const onLogout = useCallback(async () => {
		logout().finally(() => {
			queryClient.setQueryData([QUERY_KEY.auth], {
				user: null,
				token: null,
			});
			storage.removeToken();
			navigate('/login');
		});
	}, [navigate, queryClient]);

	return onLogout;
}

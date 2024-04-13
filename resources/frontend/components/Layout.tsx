import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { useAuth } from '@/hooks/auth.hook';
import { useEffect } from 'react';
import { AppFooter } from '@/pages/landing/components/AppFooter';

export function Layout({ variant }: { variant: 'auth' | 'guest' }) {
	const navigate = useNavigate();
	const { user, token } = useAuth();

	useEffect(() => {
		// Redirect to login page if user is not authenticated
		if ((!user || !token) && variant === 'auth') navigate('', { replace: true });

		// Redirect to dashboard if user is authenticated
		if (user && token && variant === 'guest') navigate('/dashboard', { replace: true });
	}, [user]);

	// Guest Layout
	return variant === 'guest' ? (
		<Outlet />
	) : (
		// Authenticated Layout
		<div className="flex flex-col min-h-screen">
			{/* Background pattern */}
			<div className="pattern"></div>

			{/* Header */}
			<AppHeader />

			{/* Page Content */}
			<main className="flex-1 flex flex-col gap-4 p-4 sm:p-8 pt-6 xl:mx-[5%] 2xl:mx-[8%]">
				<Outlet />
			</main>

			{/* Footer */}
			<AppFooter />
		</div>
	);
}

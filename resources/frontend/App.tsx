import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/auth.hook';
import useDarkMode from '@/hooks/darkMode.hook';
import { Icons } from '@/components/Icons';
import { Layout } from '@/components/Layout';
import { Layout as LandingLayout } from '@/pages/landing/Layout';
import { DashboardLayout } from '@/pages/dashboard/Layout';
import { MarketplacePage } from '@/pages/marketplace/Page';
import { LoginPage } from '@/pages/authentication/Login';
import { RegisterPage } from '@/pages/authentication/Register';
import { SettingsLayout } from '@/pages/settings/Layout';
import { SettingsAccountPage } from '@/pages/settings/Account';
import { SettingsPasswordPage } from '@/pages/settings/Password';
import { NotFoundPage } from '@/pages/404/Page';
import { VehiclePage } from '@/pages/estate/Page';
// import { LocationsPage } from '@/pages/locations/Page';
// import { AnalysesDashboardPage } from '@/pages/dashboard/Analyses';
import { DashboardOverviewPage } from '@/pages/dashboard/Overview';
import { LandingPage } from '@/pages/landing/Page';
import { useEffect } from 'react';
import { toast } from './hooks/toast.hook';
import { ToastCookiesAction } from './components/ui/ToastCookiesAction';
// import { TermsAndConditions } from './pages/t&c/Page';

// This is the topmost app component
export default function App() {
	const { isDarkMode } = useDarkMode();
	const { isLoading, isAuthenticated } = useAuth();
	const [searchParams] = useSearchParams();

	// Imame kukita maina
	useEffect(() => {
		// Check if the 'cookiesAccepted' flag exists in localStorage
		const cookiesAccepted = localStorage.getItem('cookiesAccepted');

		if (!isLoading && !cookiesAccepted) {
			toast({
				title: `Бисквитки`,
				description: `Този сайт използва "бисквитки", за да подобри вашето потребителско изживяване.`,
				action: <ToastCookiesAction />,
				duration: Infinity,
			});
		}
	}, [isLoading]);

	return isLoading ? (
		// Loading screen
		<div className="flex items-center justify-center h-screen text-lg font-medium animate-pulse">
			<Icons.logo variant={isDarkMode ? 'default' : 'dark'} className="h-14" />
		</div>
	) : (
		<Routes>
			{/* Landing page */}
			<Route element={<LandingLayout />}>
				<Route path="/" element={<LandingPage />} />
			</Route>

			{/* Redirect */}
			<Route
				path="*"
				element={<Navigate replace to={isAuthenticated ? `/dashboard?${searchParams.toString()}` : '/login'} />}
			/>

			{/* Authenticated pages */}
			<Route element={<Layout variant="auth" />}>
				<Route path="dashboard" element={<DashboardLayout />}>
					<Route path="" element={<DashboardOverviewPage />} />
					{/*<Route path="analyses" element={<AnalysesDashboardPage />} />*/}
				</Route>
				<Route path="marketplace" element={<MarketplacePage />} />
				{/*<Route path="locations" element={<LocationsPage />} />*/}
				<Route path="estates/:id" element={<VehiclePage />} />
				<Route path="settings" element={<SettingsLayout />}>
					<Route path="" element={<Navigate replace to="account" />} />
					<Route path="*" element={<Navigate replace to="account" />} />
					<Route path="account" element={<SettingsAccountPage />} />
					<Route path="password" element={<SettingsPasswordPage />} />
				</Route>
				{/* <Route path="admin" element={<AdminPanel />}>
					<Route path="" element={<Navigate replace to="users" />} />
					<Route path="users" element={<AdminUsersDashboardPage />} />
					<Route path="analyses" element={<AdminAnalysesDashboardPage />} />
				</Route> */}
			</Route>

			{/* Guest pages */}
			<Route element={<Layout variant="guest" />}>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
			</Route>


			{/* 404 */}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/auth.hook';
import useDarkMode from '@/hooks/darkMode.hook';
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
import { VehiclePage } from '@/pages/advertiment/Page';
// import { LocationsPage } from '@/pages/locations/Page';
import { UserAdvertismentsPage } from '@/pages/dashboard/Advertisments';
import { DashboardOverviewPage } from '@/pages/dashboard/Overview';
import { LandingPage } from '@/pages/landing/Page';
import { useEffect } from 'react';
import { toast } from './hooks/toast.hook';
import { ToastCookiesAction } from './components/ui/ToastCookiesAction';
import { AdminPanel } from './pages/admin/Page';
import { AdminUsersDashboardPage } from './pages/admin/AdminUsers';
import { AdminAdvertismentsDashboardPage } from './pages/admin/AdminAdvertisment';
import { getLocations, getVehicleBrands } from './data';
import { QUERY_KEY } from './data/constants';
import { useQuery } from '@tanstack/react-query';

// import { TermsAndConditions } from './pages/t&c/Page';

// This is the topmost app component
export default function App() {
	const { isDarkMode } = useDarkMode();
	const { isLoading, isAuthenticated } = useAuth();
	const [searchParams] = useSearchParams();

	const backgroundImages = Object.values(
		import.meta.glob('@/assets/background/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
	);
	
	// Load vehicle brands
	useQuery({ queryKey: [QUERY_KEY.vehicleBrands], queryFn: getVehicleBrands });
	useQuery({ queryKey: [QUERY_KEY.locations], queryFn: () => getLocations() });
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
			{isDarkMode ? <img src={backgroundImages[1]}></img> : <img src={backgroundImages[0]}></img>}
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
					<Route path="advertisements" element={<UserAdvertismentsPage />} />
				</Route>
				<Route path="marketplace" element={<MarketplacePage />} />
				<Route path="advertisements/:id" element={<VehiclePage />} />
				<Route path="settings" element={<SettingsLayout />}>
					<Route path="" element={<Navigate replace to="account" />} />
					<Route path="*" element={<Navigate replace to="account" />} />
					<Route path="account" element={<SettingsAccountPage />} />
					<Route path="password" element={<SettingsPasswordPage />} />
				</Route>
				<Route path="admin" element={<AdminPanel />}>
					<Route path="" element={<Navigate replace to="users" />} />
					<Route path="users" element={<AdminUsersDashboardPage />} />
					<Route path="advertisements" element={<AdminAdvertismentsDashboardPage />} />
				</Route>
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

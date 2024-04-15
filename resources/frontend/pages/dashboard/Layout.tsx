import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useAuth } from '@/hooks/auth.hook';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AdvertismentDialog } from './components/AdvertismentDialog';
export function DashboardLayout() {
	// Get the current location
	const location = useLocation();
	const path = location.pathname;
	const { user } = useAuth();

	// Determine the default tab based on the URL
	let defaultTab = 'overview';
	if (path.includes('/dashboard/advertisements')) defaultTab = 'advertisements';

	return (
		<>
			{/* Dashboard Header */}
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Здравей {user?.name}</h2>
			</div>
			<Tabs defaultValue={defaultTab} value={defaultTab} className="space-y-4">
				<div className="flex justify-between">
					<TabsList>
						{/* Overview Tab */}
						<NavLink to="/dashboard">
							<TabsTrigger value="overview">Преглед</TabsTrigger>
						</NavLink>

						{/* Advertisements Tab */}
						<NavLink to="/dashboard/advertisements">
							<TabsTrigger value="advertisements">Моите обяви</TabsTrigger>
						</NavLink>
					</TabsList>

					<AdvertismentDialog />
				</div>

				{/* Outlet for rendering nested routes */}
				<Outlet />
			</Tabs>
		</>
	);
}

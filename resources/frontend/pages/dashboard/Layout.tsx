import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useAuth } from '@/hooks/auth.hook';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

export function DashboardLayout() {
	// Get the current location
	const location = useLocation();
	const path = location.pathname;
	const { user } = useAuth();
	// Determine the default tab based on the URL
	let defaultTab = 'overview';
	if (path.includes('/dashboard/analyses')) defaultTab = 'analyses';

	return (
		<>
			{/* Dashboard Header */}
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Здравей {user?.name}</h2>
			</div>

			<Tabs defaultValue={defaultTab} value={defaultTab} className="space-y-4">
				<TabsList>
					{/* Overview Tab */}
					<NavLink to="/dashboard">
						<TabsTrigger value="overview">Преглед</TabsTrigger>
					</NavLink>

					{/* Analyses Tab */}
					<NavLink to="/dashboard/analyses">
						<TabsTrigger value="analyses">Моите оферти</TabsTrigger>
					</NavLink>
				</TabsList>

				{/* Outlet for rendering nested routes */}
				<Outlet />
			</Tabs>
		</>
	);
}

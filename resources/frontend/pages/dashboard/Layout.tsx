import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

export function DashboardLayout() {
	// Get the current location
	const location = useLocation();
	const path = location.pathname;

	// Determine the default tab based on the URL
	let defaultTab = 'overview';
	if (path.includes('/dashboard/analyses')) defaultTab = 'analyses';

	return (
		<>
			{/* Dashboard Header */}
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Моят дашборд</h2>
			</div>

			<Tabs defaultValue={defaultTab} value={defaultTab} className="space-y-4">
				<TabsList>
					{/* Overview Tab */}
					<NavLink to="/dashboard">
						<TabsTrigger value="overview">Преглед</TabsTrigger>
					</NavLink>

					{/* Analyses Tab */}
					<NavLink to="/dashboard/analyses">
						<TabsTrigger value="analyses">Имотни анализи</TabsTrigger>
					</NavLink>
				</TabsList>

				{/* Outlet for rendering nested routes */}
				<Outlet />
			</Tabs>
		</>
	);
}

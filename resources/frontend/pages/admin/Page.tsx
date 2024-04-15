import { Separator } from '@/components/ui/Separator';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth.hook';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export function AdminPanel() {
	// Get the current location
	const location = useLocation();
	const path = location.pathname;

	// Determine the active tab based on the current URL
	let activeTab = 'users';
	if (path.includes('/admin/advertisements')) activeTab = 'advertisements';
	if (path.includes('/admin/users')) activeTab = 'users';

	const { user } = useAuth();

	if (user && !user.isAdmin) {
		return <Navigate to="/dashboard" replace={true} />;
	}

	return (
		<div className="flex items-center justify-center h-full">
			<div className="w-full p-6">
				<h2 className="mb-2 text-2xl font-bold tracking-tight text-center">Администраторски панел</h2>
				<p className="mb-6 text-center text-muted-foreground">Управление на потребителите и обяви</p>
				<div className="flex flex-col items-center justify-center pb-5 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<Tabs value={activeTab} defaultValue={activeTab} className="space-y-4">
						<TabsList>
							{/* Users Tab */}
							<NavLink to="/admin/users">
								<TabsTrigger value="users">Потребители</TabsTrigger>
							</NavLink>

							{/* Advertisements Tab */}
							<NavLink to="/admin/advertisements">
								<TabsTrigger value="advertisements">Обяви</TabsTrigger>
							</NavLink>
						</TabsList>
					</Tabs>
				</div>
				<Separator className="my-6" />
				{/* Outlet for rendering nested routes */}
				<Outlet />
			</div>
		</div>
	);
}

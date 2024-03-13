import { Outlet } from 'react-router-dom';
import { Separator } from '@/components/ui/Separator';
import { SidebarNav } from '@/pages/settings/components/SidebarNav';

const sidebarNavItems = [
	{
		title: 'Акаунт',
		to: '/settings/account',
	},
	{
		title: 'Смяна на парола',
		to: '/settings/password',
	}
];

export function SettingsLayout() {
	return (
		<div className="block pb-16 space-y-6">
			<div className="space-y-0.5">
				<h2 className="text-2xl font-bold tracking-tight">Настройки</h2>
				<p className="text-muted-foreground">Управление на настройките на акаунта и паролата Ви</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="-mx-4 lg:w-1/5">
					<SidebarNav items={sidebarNavItems} />
				</aside>
				<div className="flex-1 lg:max-w-2xl">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

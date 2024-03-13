import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navConfig } from '@/config/nav';
import { useAuth } from '@/hooks/auth.hook';

export function MainNavigation({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	const { user } = useAuth();

	return (
		<nav className={cn('hidden md:flex items-center space-x-4 lg:space-x-6', className)} {...props}>
			{/* Navigation links */}
			{navConfig.mainNav?.map((item) => (
				<NavLink
					key={item.to}
					to={item.to}
					className={({ isActive }) =>
						cn([
							'text-sm font-medium transition-colors hover:text-primary',
							!isActive && 'text-muted-foreground',
						])
					}
				>
					{item.title}
				</NavLink>
			))}

			{/* Admin panel link */}
			{user && user.isAdmin ? (
				<a href="/admin" className="text-sm font-medium transition text-brand hover:opacity-100">
					Админ панел
				</a>
			) : null}
		</nav>
	);
}

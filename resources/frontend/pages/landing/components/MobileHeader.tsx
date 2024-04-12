import * as React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { Menu } from 'lucide-react';
import { NavLink, NavLinkProps, Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import { useAuth } from '@/hooks/auth.hook';
import useDarkMode from '@/hooks/darkMode.hook';

export function MobileHeader() {
	const { isAuthenticated } = useAuth();

	const [open, setOpen] = React.useState(false);
	const { isDarkMode } = useDarkMode();
	const backgroundImages = Object.values(
		import.meta.glob('@/assets/background/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
	);
	// function onBillingClick() {
	// 	const billing = document.getElementById('pricing');
	// 	billing?.scrollIntoView({ behavior: 'smooth' });
	// 	setOpen(false);
	// }
    //
	// function onFeaturesClick() {
	// 	const billing = document.getElementById('features');
	// 	billing?.scrollIntoView({ behavior: 'smooth' });
	// 	setOpen(false);
	// }

	return (
		<header className="relative md:hidden">
			<div className="flex items-center justify-between h-16 px-4">
				<Link to="#" aria-label="Home" className="flex flex-row items-center">
				{isDarkMode ? <img src={backgroundImages[1]}></img> : <img src={backgroundImages[0]}></img>}
				</Link>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
						>
							<Menu className="w-6 h-6" />
							<span className="sr-only">Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent size="default" position="top" className="pr-0">
						<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
							<div className="flex flex-col space-y-4">
								{/*<MobileLink key="За проекта" to="#features" icon="info" onClick={onFeaturesClick}>*/}
								{/*	<span className="font-bold">За проекта</span>*/}
								{/*</MobileLink>*/}
								{/*<MobileLink key="Цени" to="#pricing" icon="billing" onClick={onBillingClick}>*/}
								{/*	<span className="font-bold">Цени</span>*/}
								{/*</MobileLink>*/}
								{!isAuthenticated && (
									<MobileLink key="/login" to="/login" icon="user" onOpenChange={setOpen}>
										<span className="font-bold">Вход</span>
									</MobileLink>
								)}
								<MobileLink
									key={isAuthenticated ? '/dashboard' : '/register'}
									to={isAuthenticated ? '/dashboard' : '/register'}
									icon="laptop"
									onOpenChange={setOpen}
								>
									<span className="font-bold">{isAuthenticated ? 'Дашборд' : 'Започнете сега'}</span>
								</MobileLink>
							</div>
						</ScrollArea>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}

interface MobileLinkProps extends NavLinkProps {
	icon?: keyof typeof Icons;
	onOpenChange?: (open: boolean) => void;
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({ to, onOpenChange, className, children, ...props }: MobileLinkProps) {
	const Icon = Icons[props.icon ?? 'arrowRight'];

	// Render the link if 'to' prop is provided
	return (
		<NavLink
			to={to}
			onClick={() => {
				onOpenChange?.(false);
			}}
			className={cn('flex items-center', className)}
			{...props}
		>
			<Icon className="w-4 h-4 mr-2 text-muted-foreground" />
			{children}
		</NavLink>
	);
}

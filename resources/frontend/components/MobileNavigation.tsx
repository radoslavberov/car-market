'use client';

import * as React from 'react';
import { SidebarOpen } from 'lucide-react';
import { Link, NavLink, NavLinkProps } from 'react-router-dom';

import { navConfig } from '@/config/nav';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { Icons } from '@/components/Icons';
import useDarkMode from '@/hooks/darkMode.hook';

export function MobileNavigation() {
	const [open, setOpen] = React.useState(false);
	const { isDarkMode } = useDarkMode();
	const backgroundImages = Object.values(
		import.meta.glob('@/assets/background/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
	);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<SidebarOpen className="w-6 h-6" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent size="xl" position="left" className="pr-0">
				<LogoStart>
					<Link to="/" className="">
					{isDarkMode ? <img src={backgroundImages[1]}></img> : <img src={backgroundImages[0]}></img>}
					</Link>
				</LogoStart>
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="flex flex-col space-y-3">
						{navConfig.mainNav?.map(
							(item) =>
								item.to && (
									<MobileLink key={item.to} to={item.to} icon={item.icon} onOpenChange={setOpen}>
										{item.title}
									</MobileLink>
								),
						)}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends NavLinkProps {
	icon?: keyof typeof Icons;
	onOpenChange?: (open: boolean) => void;
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

interface LogoStartProps {
	className?: string;
	children: React.ReactNode;
	icon?: keyof typeof Icons;
	// Add any other props you want to allow
}

function LogoStart({ className, children, ...props }: LogoStartProps) {
	const Icon = Icons[props.icon ?? 'arrowRight'];

	// Render content without any interactivity
	return (
		<div className={cn('flex items-center', className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
			<Icon className="w-4 h-4 mr-2 text-muted-foreground" />
			{children}
		</div>
	);
}

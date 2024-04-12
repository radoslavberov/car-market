import { useAuth } from '@/hooks/auth.hook';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/pages/landing/components/Button';

export function MainHeader() {
	const { isAuthenticated } = useAuth();
	const backgroundImages = Object.values(
		import.meta.glob('@/assets/background/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
	);
	return (
		<header className="hidden py-10 md:block">
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<nav className="relative z-50 flex justify-between">
					<div className="flex flex-col items-center md:flex-row md:gap-x-12">
						<Link to="#" aria-label="Home" className="flex flex-row items-center">
							<img src={backgroundImages[1]}></img>
						</Link>

						<div className="items-center md:flex md:gap-x-6 md:flex-row">
							<div className="text-center md:mb-0">
								{/*<a href="#features" className="block my-2 md:inline-block md:mr-6">*/}
								{/*	За Проекта*/}
								{/*</a>*/}
								{/*<a href="#pricing" className="block md:inline-block">*/}
								{/*	Цена*/}
								{/*</a>*/}
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center md:flex-row gap-x-5 md:gap-x-8">
						<div className="flex flex-col items-center md:flex-row md:gap-x-12">
							{!isAuthenticated && (
								<NavLink
									to="/login"
									className={`${cn(
										buttonVariants({ variant: 'secondary', size: 'lg' }),
									)} mb-2 md:mb-0`}
								>
									Вход
								</NavLink>
							)}
							<NavLink
								to={isAuthenticated ? '/dashboard' : '/register'}
								className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
							>
								{isAuthenticated ? (
									'Дашборд'
								) : (
									<span>
										Започнете <span className="hidden lg:inline">днес</span>
									</span>
								)}
							</NavLink>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}

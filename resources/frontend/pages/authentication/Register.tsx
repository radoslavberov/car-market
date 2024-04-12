import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { RegisterForm } from '@/pages/authentication/components/RegisterForm';
import { siteConfig } from '@/config/site';

export function RegisterPage() {
	const backgroundImages = Object.values(
		import.meta.glob('@/assets/background/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
	);
	return (
		<>
			<div className="container relative grid flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="absolute flex right-4 top-4">
					<Link
						to="/"
						className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'md:right-24 md:top-8')}
					>
						Начало
					</Link>
					<Link
						to="/login"
						className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'md:right-8 md:top-8')}
					>
						Вход
					</Link>
				</div>
				<div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
					<div
						className="absolute inset-0 bg-cover"
						style={{
							backgroundImage: `url(${siteConfig.backgroundImage})`,
						}}
					/>
					<div className="absolute inset-0 bg-cover backdrop-blur-md backdrop-brightness-50"></div>
					<div className="relative z-20 flex items-center text-lg font-medium">
						<Link to="/" aria-label="Home" className="flex flex-row items-center">
							<img src={backgroundImages[1]}></img>
						</Link>
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-xl font-semibold">{siteConfig.description1}</p>
							<p className="text-lg italic opacity-75">{siteConfig.description2}</p>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">Създайте акаунт</h1>
							<p className="text-sm text-muted-foreground">Въведете данните си за да създадете акаунт</p>
						</div>
						<RegisterForm />
						{/* <p className="px-8 text-sm text-center text-muted-foreground">
							By clicking continue, you agree to our{' '}
							<Link to="/terms" className="underline underline-offset-4 hover:text-primary">
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
								Privacy Policy
							</Link>
							.
						</p> */}
					</div>
				</div>
			</div>
		</>
	);
}

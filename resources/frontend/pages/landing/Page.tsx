import { buttonVariants } from '@/pages/landing/components/Button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/hooks/auth.hook';

const gallery = Object.values(import.meta.glob('@/assets/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }));

const features = [
	{
		title: 'Дашборд',
		description: 'Всичко, което ви трябва на едно място.',
		image: gallery[0],
	},
	{
		title: 'Превозни средства',
		description: 'Подробна информация за всяко едно превозно. Открийте вашия нов автомобил сега.',
		image: gallery[1],
	},
];

export function LandingPage() {
	const { isAuthenticated } = useAuth();
	let [selectedTabIndex, setSelectedTabIndex] = useState(0);

	return (
		<>
			{/* Hero */}
			<div className="relative flex flex-col items-center px-4 pt-20 pb-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:pt-32">
				<h3 className="max-w-4xl text-5xl font-medium tracking-tight sm:text-5xl">Mobirex - платформа за продажба на автомобили</h3>
				{!isAuthenticated && (
					<div className="flex justify-center mt-10 gap-x-6">
						<Link to="/register" className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>
							Регистрирайте се!
						</Link>
					</div>
				)}
			</div>

			{/* Feature List */}
			<section id="features" className="relative pt-20 overflow-hidden bg-black pb-28 sm:py-32">
				<div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
						<h2 className="text-3xl tracking-tight text-white font-display sm:text-4xl md:text-3xl">
							Всичко, което ви трябва, за да откриете вашия бъдещ автомобил.
						</h2>
					</div>
					<div className="grid items-center grid-cols-1 pt-10 mt-16 gap-y-2 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
						<>
							{/* Feature Tabs */}
							<div className="flex pb-4 -mx-4 overflow-x-auto sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
								<div className="relative z-10 flex px-4 gap-x-4 whitespace-nowrap sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
									{features.map((feature, featureIndex) => (
										<div
											key={feature.title}
											onClick={() => setSelectedTabIndex(featureIndex)}
											className={cn(
												'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
												selectedTabIndex === featureIndex
													? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
													: 'hover:bg-white/10 lg:hover:bg-white/5',
											)}
										>
											<h3>
												<span
													className={cn(
														'font-display text-lg ui-not-focus-visible:outline-none',
														selectedTabIndex === featureIndex
															? 'text-blue-600 lg:text-white'
															: 'text-blue-100 hover:text-white lg:text-white',
													)}
												>
													<span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
													{feature.title}
												</span>
											</h3>
											<p
												className={cn(
													'mt-2 hidden text-sm lg:block',
													selectedTabIndex === featureIndex
														? 'text-white'
														: 'text-blue-100 group-hover:text-white',
												)}
											>
												{feature.description}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Feature Info */}
							<div className="lg:col-span-7">
								{features.map((feature, featureIndex) => (
									<div
										key={feature.title}
										className={cn(selectedTabIndex === featureIndex ? 'block' : 'hidden')}
									>
										<div className="relative sm:px-6 lg:hidden">
											<div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
											<p className="relative max-w-2xl mx-auto text-base text-white sm:text-center">
												{feature.description}
											</p>
										</div>
										<div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
											<img
												className="w-full"
												src={feature.image}
												alt=""
												sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
											/>
										</div>
									</div>
								))}
							</div>
						</>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="relative">
				{/* Background image */}
				<div
					className="absolute inset-0 top-0 z-0 bg-cover"
					style={{
						backgroundImage: `url(${siteConfig.backgroundImage})`,
					}}
				/>
				<div className="absolute inset-0 z-0 bg-cover backdrop-blur-md backdrop-brightness-50"></div>
			</section>
		</>
	);
}

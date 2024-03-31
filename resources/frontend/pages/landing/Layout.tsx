import { Outlet } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { MainHeader } from '@/pages/landing/components/MainHeader';
import { MobileHeader } from './components/MobileHeader';
import { Footer } from '@/pages/landing/components/Footer';

export function Layout() {
	return (
		<div className="relative min-h-screen text-white max-h-fit">
			<div
				className="absolute inset-x-0 top-10 z-0 bg-no-repeat bg-cover bottom-1/2"
				style={{
					backgroundImage: `url(${siteConfig.landingImage})`,
				}}
			/>
			<div className="absolute inset-0 z-0 bg-cover backdrop-blur-md backdrop-brightness-50"></div>
			<MainHeader />
			<MobileHeader />
			<main className="relative flex-1 pt-6">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

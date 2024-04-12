import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/Icons';

export function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<>
			<div className="relative flex-col items-center justify-center h-screen lg:max-w-none">
				<div className="relative flex flex-col w-full h-full p-10 text-white bg-muted">
					<div
						className="absolute inset-0 bg-cover"
						style={{
							backgroundImage:
								'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
						}}
					/>
					<div className="absolute inset-0 bg-cover backdrop-blur-md"></div>
					<div className="relative z-20 flex items-center text-lg font-medium">
					{isDarkMode ? <img src={backgroundImages[1]}></img> : <img src={backgroundImages[0]}></img>}
					</div>

					{/* Page not found */}
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bottom-1/4 lg:gap-10">
						<h1 className="text-4xl font-bold tracking-tight scroll-m-20 lg:text-7xl">Page not found :(</h1>
						<Button size="lg" variant="outline" className="px-24" onClick={() => navigate(-1)}>
							Назад
						</Button>
					</div>

					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">{siteConfig.description1}</p>
						</blockquote>
					</div>
				</div>
			</div>
		</>
	);
}

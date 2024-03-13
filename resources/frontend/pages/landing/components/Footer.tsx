import { Icons } from '@/components/Icons';
// import { siteConfig } from '@/config/site';
// import logo_1 from '@/assets/eu/logo_1.png';
// import logo_2 from '@/assets/eu/logo_2.png';

export function Footer() {
	return (
		<footer className="relative bg-black">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
				<div className="py-16">
					<span className="flex flex-row items-center justify-center w-auto mx-auto">
						<Icons.logo className="h-11" />
					</span>
					<nav className="mt-10 text-sm" aria-label="quick links">
						<div className="flex items-center justify-center -my-1 gap-x-6">
							<a href="#">Начало</a>
							{/*<a href="#features">За Проекта</a>*/}
							{/*<a href="#pricing">Цена</a>*/}
							<a href="/terms-and-conditions" target="_blank">
								Условия за ползване
							</a>
						</div>
					</nav>
				</div>
				<div className="flex flex-col items-center py-10 border-t border-slate-400/10 sm:flex-row-reverse sm:justify-between">
					<div className="flex flex-col gap-y-3 sm:gap-y-2">

					</div>
				</div>
			</div>
		</footer>
	);
}

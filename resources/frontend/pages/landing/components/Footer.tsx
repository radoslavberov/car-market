export function Footer() {
	const backgroundImages = Object.values(
		import.meta.glob('@/assets/background/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
	);
	return (
		<footer className="relative bg-black">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
				<div className="py-16">
					<span className="flex flex-row items-center justify-center w-auto mx-auto">
					<img className="h-20" src={backgroundImages[1]}></img>
					</span>
					<nav className="mt-3 text-sm" aria-label="quick links">
						<div className="flex items-center justify-center -my-1 gap-x-6">
							<a href="#">Начало</a>
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

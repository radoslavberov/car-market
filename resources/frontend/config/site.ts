const backgroundImages = Object.values(
	import.meta.glob('@/assets/backgrounds/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
);

export const siteConfig = {
	name: 'car-market.com',
	url: 'https://car-market.com',
	// ogImage: 'https://ui.shadcn.com/og.jpg',
	landingImage: backgroundImages[1],
	backgroundImage: backgroundImages[0],
	// description1:
	// 	'Намерете най-актуалните и разнообразни оферти за недвижими имоти от множество доставчици в България.',
	// description2:
	// 	'Независимо дали търсите къща, апартамент, вила или парцел, ще Ви предоставим богат каталог с възможности, които да отговарят на вашите предпочитания и изисквания. Нашите AI анализи обхващат широк спектър от параметри, включително цена, местоположение, площ и други ключови фактори, които ви помагат да направите информиран избор.',
	links: {
		facebook: '',
		twitter: '',
	},
};

export type SiteConfig = typeof siteConfig;

const backgroundImages = Object.values(
	import.meta.glob('@/assets/backgrounds/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }),
);

export const siteConfig = {
	name: 'car-market.com',
	url: 'https://car-market.com',
	// ogImage: 'https://ui.shadcn.com/og.jpg',
	landingImage: backgroundImages[1],
	backgroundImage: backgroundImages[0],
	links: {
		facebook: '',
		twitter: '',
	},
};

export type SiteConfig = typeof siteConfig;

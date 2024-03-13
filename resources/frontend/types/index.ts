export interface User {
	id: number;
	name: string;
	email: string;
	active: number; // 1 or 0
	isAdmin: number; // 1 or 0
	emailVerifiedAt: string | null; // ISO date
    // monthlyAnalysisDone: number;
	// analysisRemaining: number;
	// analysisLimit: number;
	createdAt: string | null; // ISO date
	updatedAt: string | null; // ISO date
}

export interface ErrorResponse {
	message: string;
	errors?: {
		[key: string]: string[];
	} | null;
}

export interface PopulationRange {
	age: string;
	men: number;
	women: number;
}

export interface Estate {
	// id: number;
	// url: string;
	// price: string | null;
	// squareMeters: string | null;
	// priceSquareMeters: string | null;
	// floor: number | null;
	// year: number | null;
	// location: Location | null;
	// district: District | null;
	// estateType: EstateType | null;
	// constructionType: ConstructionType | null;
	// latitude: string | null;
	// longitude: string | null;
	// population: PopulationRange[] | null;
	// provider: string | null;
	// description: string | null;
    // createdAt: string | null; // ISO date
    // updatedAt: string | null; // ISO date
    // crawledAt: string | null; // ISO date
	// active: boolean;
}

// export interface EstateType {
// 	id: number;
// 	name: string;
// 	slug: string;
// }
//
// export interface Location {
// 	id: number;
// 	name: string;
// 	slug: string;
// }

// export interface LocationEstateData {
// 	id: number;
// 	name: string;
// 	slug: string;
// 	estates: {
// 		count: number;
// 		averagePrice: string;
// 		averagePriceSquareMeters: string;
// 		averageSquareMeters: string;
// 	};
// }
// export interface Provider {
// 	id: number;
// 	name: string;
// 	url: string;
// }
// export interface District {
// 	id: number;
// 	name: string;
// 	slug: string;
// 	location: {
// 		id: number;
// 		name: string;
// 	} | null;
// }

// export interface ConstructionType {
// 	id: number;
// 	name: string;
// 	slug: string;
// }

export interface DashboardStats {
	// avgPriceSqMeter: { price: string; location: string | null; provider: string | null }[];
	// total: {
	// 	estates: number;
	// 	providers: number;
	// 	locations: number;
	// 	districts: number;
	// };
	// estateCountByType: {
	// 	name: string | null;
	// 	count: number;
	// }[];
	// estateCountLastWeek: {
	// 	date: string;
	// 	count: number;
	// }[];
}
export interface Analysis {
	// id: number;
	// estateId: number;
	// userId: number;
	// score: number;
	// pros: string;
	// cons: string;
	// description: string;
	// createdAt: string; // ISO date
	// updatedAt: string; // ISO date
}
export interface Favorite {
	// id: number;
	// estateId: number;
	// userId: number;
}

export interface AdminPanelUser {
	id: number;
	name: string;
	email: string;
	isAdmin: number;
	active: number;
	createdAt: string; // ISO date
	updatedAt: string; // ISO date
	analysisDone: number;
}

export interface AdminPanelAnylysis {
	id: number;
	estateId: number;
	pros: string;
	cons: string;
	score: number;
	description: string;
	createdAt: string; // ISO date
	updatedAt: string; // ISO date
	user: { id: number, name: string, email: string };
}

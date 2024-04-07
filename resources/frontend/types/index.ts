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

export interface Fuel {
	id: number;
	name: string;
	active: boolean;
}

export interface VehicleModelType {
	id: number;
	name: string;
	vehicleModel: VehicleModel;
	active: boolean;
}

export interface VehicleBrand {
	id: number;
	name: string;
	active: boolean;
}

export interface VehicleCategory {
	id: number;
	name: string;
	active: boolean;
}

export interface VehicleModel {
	id: number;
	name: string;
	vehicleBrand: VehicleBrand;
	active: boolean;
}

export interface Transmission {
	id: number;
	name: string;
	active: boolean;
}
export interface Location {
	id: number;
	name: string;
	active: boolean;
}
export interface Advertisement {
	id: number;
	name: string;
	price: number;
	mileage: number;
	horsePower: number;
	engine_capacity: number;
	color: string;
	description: string;
	user: User;
	comments: Comment[];
	year: number;
	location: Location;
	vehicleBrand: VehicleBrand;
	vehicleModel: VehicleModel;
	vehicleModelType: VehicleModelType | null;
	vehicleCategory: VehicleCategory;
	fuel: Fuel;
	transmission: Transmission;
}

export interface AdvertisementInput {
	[key: string]: any;
	price: number;
	mileage: number;
	horse_power: number;
	engine_capacity: number;
	year: number;
}

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
	total: {
		advertisements: number;
		brands: number;
		locations: number;
		getTodayAdvertisements: number;
	};
	getAveragePriceByBrand: {
		vehicleBrand: string | null;
		price: number;
	}[];
	advertisementsCountByCategory: {
		name: string;
		count: number;
	}[];
	advertisementsCountLastWeek: {
		date: string;
		count: number;
	}[];
}
export interface Comment {
	id: number;
	advertisementId: number;
	userId: number;
	description: string;
	createdAt: string; // ISO date
	updatedAt: string; // ISO date
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
	user: { id: number; name: string; email: string };
}

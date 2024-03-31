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
	price: number | null;
	mileage: number | null;
	horsePower: number | null;
	engine_capacity: number | null;
	color: string | null;
	description: string | null;
	user: User;
	year: number | null;
	location: Location | null;
	vehicleBrand: VehicleBrand | null;
	vehicleModel: VehicleModel | null;
	vehicleModelType: VehicleModelType | null;
	vehicleCategory: VehicleCategory | null;
	fuel: Fuel | null;
	transmission: Transmission | null;
}

// export interface EstateType {
// 	id: number;
// 	name: string;
// 	slug: string;
// }
//


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
	user: { id: number; name: string; email: string };
}

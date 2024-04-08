import {
	DashboardStats,
	AdminPanelUser,
	AdminPanelAnylysis,
	Advertisement,
	AdvertisementInput,
	ErrorResponse,
	VehicleBrand,
	VehicleModelType,
	VehicleModel,
	Location,
} from '@/types/index';
import { ColumnFiltersState } from '@tanstack/react-table';
import api from '@/lib/api';
import axios from 'axios';

export const getDashboardStats = async (): Promise<DashboardStats> => {
	return api.get('/api/dashboard-stats').then((res) => {
		return res.data.data;
	});
};

// export const getAdvertisements = async ({
// 	pageIndex = 0,
// 	pageSize = 50,
// 	sortBy,
// 	sort,
// 	filters,
// }: {
// 	pageIndex: number;
// 	pageSize: number;
// 	sortBy?: string;
// 	sort?: 'asc' | 'desc';
// 	filters?: ColumnFiltersState;
// }): Promise<{
// 	rows: Advertisement[];
// 	meta: {
// 		from: number;
// 		to: number;
// 		current_page: number;
// 		last_page: number;
// 		per_page: number;
// 		total: number;
// 	};
// }> => {
// 	let location = null,
// 		district = null,
// 		constructionType = null,
// 		estateType = null,
// 		provider = null;

// 	if (filters && filters.length > 0) {
// 		// Get valid filters
// 		const locationFilters = filters.find((filter) => filter.id === 'location' && Array.isArray(filter.value));
// 		const districtFilters = filters.find((filter) => filter.id === 'district' && Array.isArray(filter.value));
// 		const constructionTypeFilters = filters.find(
// 			(filter) => filter.id === 'constructionType' && Array.isArray(filter.value),
// 		);
// 		const estateTypeFilters = filters.find((filter) => filter.id === 'estateType' && Array.isArray(filter.value));
// 		const providerFilters = filters.find((filter) => filter.id === 'provider' && Array.isArray(filter.value));

// 		// Apply filters
// 		if (locationFilters) location = (locationFilters.value as string[]).map((item) => Number(item));
// 		if (districtFilters) district = (districtFilters.value as string[]).map((item) => Number(item));
// 		if (constructionTypeFilters)
// 			constructionType = (constructionTypeFilters.value as string[]).map((item) => Number(item));
// 		if (estateTypeFilters) estateType = (estateTypeFilters.value as string[]).map((item) => Number(item));
// 		if (providerFilters) provider = (providerFilters.value as string[]).map((item) => Number(item));
// 	}

// 	return api
// 		.get('/api/estates', {
// 			params: {
// 				page: pageIndex + 1,
// 				limit: pageSize,
// 				sortBy,
// 				sort,
// 				location,
// 				district,
// 				constructionType,
// 				estateType,
// 				provider,
// 				isFavorite: showFavorites ? 1 : 0,
// 			},
// 		})
// 		.then((res) => {
// 			return res.data.data;
// 		});
// };

export const getLocations = async (): Promise<Location> => {
	return api.get(`/api/locations`).then((res) => {
		return res.data.data;
	});
};

export const getUserAdvertisements = async (): Promise<Advertisement[]> => {
	return api.get(`/api/advertisements/advertisements`).then((res) => {
		return res.data.data;
	});
};

export const getAdvertisement = async (id: any): Promise<Advertisement> => {
	return api.get(`/api/advertisements/${id}`).then((res) => {
		return res.data.data;
	});
};

export const getAdvertisements = async (): Promise<Advertisement[]> => {
	return api.get(`/api/advertisements`).then((res) => {
		return res.data.data;
	});
};

export const getVehicleModels = async (brandId: any): Promise<VehicleModel[]> => {
	console.log('Ff');
	return api.get(`/api/vehicle-models/${brandId}`).then((res) => {
		return res.data.data;
	});
};

export const getVehicleBrands = async (): Promise<VehicleBrand[]> => {
	return api.get(`/api/vehicle-brands`).then((res) => {
		return res.data.data;
	});
};

export const getVehicleModelTypes = async (modelId: any): Promise<VehicleModelType[]> => {
	return api.get(`/api/vehicle-model-types/${modelId}`).then((res) => {
		return res.data.data;
	});
};

interface AdminPanelUserFilters {
	pageIndex: number;
	pageSize: number;
	sortBy?: string;
	sort?: 'asc' | 'desc';
	search?: string;
	active?: boolean | null;
	admin?: boolean | null;
}

export const getAdminPanelAnalyses = async ({
	pageIndex = 0,
	pageSize = 20,
	sortBy,
	sort,
	search,
	estateId,
}: {
	pageIndex: number;
	pageSize: number;
	sortBy?: string;
	sort?: 'asc' | 'desc';
	search?: string;
	estateId?: string;
}): Promise<{
	rows: AdminPanelAnylysis[];
	meta: {
		currentPage: number;
		from: number;
		lastPage: number;
		perPage: number;
		to: number;
		total: number;
	};
}> => {
	// Replace column names with sort by names
	if (sortBy === 'userName') sortBy = 'name';
	else if (sortBy === 'userEmail') sortBy = 'email';

	return api
		.get('/api/admin/analyses', {
			params: {
				page: pageIndex + 1,
				limit: pageSize,
				sortBy,
				sort,
				search,
				estateId,
			},
		})
		.then((res) => {
			return res.data.data;
		});
};

interface AdminPanelUserFilters {
	pageIndex: number;
	pageSize: number;
	sortBy?: string;
	sort?: 'asc' | 'desc';
	search?: string;
	active?: boolean | null;
	admin?: boolean | null;
}

export const getAdminPanelUsers = async ({
	pageIndex = 0,
	pageSize = 20,
	sortBy,
	sort,
	search,
	active,
	admin,
}: AdminPanelUserFilters): Promise<{
	rows: AdminPanelUser[];
	meta: {
		currentPage: number;
		from: number;
		lastPage: number;
		perPage: number;
		to: number;
		total: number;
	};
}> => {
	// Replace column names with sort by names
	if (sortBy === 'isAdmin') sortBy = 'admin';
	if (sortBy === 'analysisDone') sortBy = 'analysesCount';

	return api
		.get('/api/admin/users', {
			params: {
				page: pageIndex + 1,
				limit: pageSize,
				sortBy,
				sort,
				search,
				active: typeof active === 'boolean' ? (active ? 1 : 0) : undefined,
				admin: typeof admin === 'boolean' ? (admin ? 1 : 0) : undefined,
			},
		})
		.then((res) => {
			return res.data.data;
		});
};

export const deactivateUser = async (id: number): Promise<[]> => {
	return api.put(`/api/admin/users/${id}/deactivate`).then((res) => {
		return res.data.data;
	});
};

export const deleteAdvertisment = async (id: number): Promise<[]> => {
	return api.delete(`/api/advertisements/${id}`).then((res) => {
		return res.data.data;
	});
};

export const addAdvertisment = async (data: FormData): Promise<Advertisement> => {
	console.log(data);
	return api
		.post('/api/advertisements/store', data, { headers: { 'Content-Type': 'multipart/form-data' } })
		.then((res) => {
			return res.data.data;
		})
		.catch((e) => {
			throw {
				message: e?.response?.data?.message || 'Failed to add advertisment',
				errors: e?.response?.data?.errors || null,
			} as ErrorResponse;
		});
};

export const editAdvertisment = async (data: FormData, id: number): Promise<Advertisement> => {
	return api
		.patch(`/api/advertisements/${id}`, data)
		.then((res) => {
			return res.data.data;
		})
		.catch((e) => {
			throw {
				message: e?.response?.data?.message || 'Failed to edit advertisement',
				errors: e?.response?.data?.errors || null,
			} as ErrorResponse;
		});
};

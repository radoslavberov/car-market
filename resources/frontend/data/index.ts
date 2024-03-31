import {
	DashboardStats,
	Analysis,
	AdminPanelUser,
	AdminPanelAnylysis,
	Advertisement,
} from '@/types/index';
import { ColumnFiltersState } from '@tanstack/react-table';
import api from '@/lib/api';

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

export const generateEstateAnalysis = async (id: any): Promise<Analysis> => {
	return api.post(`/api/estates/${id}/analysis`).then((res) => {
		return res.data.data;
	});
};

export const getUserAnalyses = async ({
	pageIndex = 0,
	pageSize = 20,
	sortBy,
	sort,
}: {
	pageIndex: number;
	pageSize: number;
	sortBy?: string;
	sort?: 'asc' | 'desc';
}): Promise<{
	rows: Analysis[];
	meta: {
		currentPage: number;
		from: number;
		lastPage: number;
		perPage: number;
		to: number;
		total: number;
	};
}> => {
	return api
		.get('/api/analyses', {
			params: {
				page: pageIndex + 1,
				limit: pageSize,
				sortBy,
				sort,
			},
		})
		.then((res) => {
			return res.data;
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

export const deleteAnalysis = async (id: number): Promise<[]> => {
	return api.delete(`/api/admin/analyses/${id}`).then((res) => {
		return res.data.data;
	});
};

export const getFavorites = async (): Promise<Favorite[]> => {
	return api.get('/api/favorites').then((res) => {
		return res.data.data;
	});
};

export const makeFavorite = async (estate_id: any): Promise<Favorite> => {
	return api.post('/api/favorites', { estate_id }).then((res) => {
		return res.data.data;
	});
};

export const removeFavorite = async (favorite_id: any): Promise<void> => {
	return api.delete(`/api/favorites/${favorite_id}`).then(() => {
		// No data to return, just a successful delete
	});
};

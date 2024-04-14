import {
	DashboardStats,
	AdminPanelUser,
	Advertisement,
	ErrorResponse,
	VehicleBrand,
	VehicleModelType,
	VehicleModel,
	Location,
	GetAdvertisementParams,
} from '@/types/index';
import api from '@/lib/api';

export const getDashboardStats = async (): Promise<DashboardStats> => {
	return api.get('/api/dashboard-stats').then((res) => {
		return res.data.data;
	});
};

export const getAdvertisements = async ({
	pageIndex = 0,
	pageSize = 50,
	sortBy,
	sort,
	locations,
	brands,
	models,
	types,
	categories,
}: GetAdvertisementParams): Promise<{
	data: Advertisement[];
	meta: {
		from: number;
		to: number;
		currentPage: number;
		lastPage: number;
		perPage: number;
		total: number;
	};
}> => {
	// Execute request with filters
	return api
		.get('/api/advertisements', {
			params: {
				page: pageIndex + 1,
				limit: pageSize,
				sortBy,
				sort,
				'vehicleBrand[]': brands?.map((i) => Number(i)),
				'location[]': locations?.map((i) => Number(i)),
				'vehicleCategory[]': categories?.map((i) => Number(i)),
				'vehicleModelType[]': types?.map((i) => Number(i)),
				'vehicleModel[]': models?.map((i) => Number(i)),
			},
		})
		.then((res) => {
			return res.data;
		});
};

export const getLocations = async (): Promise<Location> => {
	return api.get(`/api/locations`).then((res) => {
		return res.data.data;
	});
};

export const getUserAdvertisements = async ({
	pageIndex = 0,
	pageSize = 50,
	sortBy,
	sort,
	locations,
	brands,
	models,
	types,
	categories,
}: GetAdvertisementParams): Promise<{
	data: Advertisement[];
	meta: {
		from: number;
		to: number;
		currentPage: number;
		lastPage: number;
		perPage: number;
		total: number;
	};
}> => {
	// Execute request with filters
	return api
		.get('/api/advertisements/advertisements', {
			params: {
				page: pageIndex + 1,
				limit: pageSize,
				sortBy,
				sort,
				'vehicleBrand[]': brands?.map((i) => Number(i)),
				'location[]': locations?.map((i) => Number(i)),
				'vehicleCategory[]': categories?.map((i) => Number(i)),
				'vehicleModelType[]': types?.map((i) => Number(i)),
				'vehicleModel[]': models?.map((i) => Number(i)),
			},
		})
		.then((res) => {
			return res.data;
		});
};

export const getAdvertisement = async (id: any): Promise<Advertisement> => {
	return api.get(`/api/advertisements/${id}`).then((res) => {
		return res.data.data;
	});
};

export const getVehicleModels = async (brandId: any): Promise<VehicleModel[]> => {
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
	data: Advertisement[];
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
		.get('api/advertisements', {
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
	if (sortBy === 'advertisementsDone') sortBy = 'analysesCount';

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

export const createComment = async (id: number, data: string): Promise<Advertisement> => {
	return api.post(`/api/advertisements/${id}/comment`, data).then((res) => {
		return res.data.data;
	});
};

export const deleteAdvertisment = async (id: number): Promise<[]> => {
	return api.delete(`/api/advertisements/${id}`).then((res) => {
		return res.data.data;
	});
};

export const addAdvertisment = async (data: FormData): Promise<Advertisement> => {
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

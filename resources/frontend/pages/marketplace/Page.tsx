import { useMemo, useState } from 'react';
import { columns } from './components/Columns';
import { DataTable } from './components/DataTable';
import { useQuery } from '@tanstack/react-query';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { getAdvertisements, getLocations, getVehicleBrands, getVehicleModelTypes, getVehicleModels } from '@/data';
import { Icons } from '@/components/Icons';
import { useSearchParams } from 'react-router-dom';
import { QUERY_KEY } from '@/data/constants';
import { useDebounce } from 'usehooks-ts';
import { GetAdvertisementParams } from '@/types';
export function MarketplacePage() {
	useQuery({ queryKey: [QUERY_KEY.vehicleBrands], queryFn: () => getVehicleBrands() });
	useQuery({ queryKey: [QUERY_KEY.locations], queryFn: () => getLocations() });
	const [searchParams, setSearchParams] = useSearchParams();

	// Pagination, sorting and filtering states
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	// Language Filter
	const models = searchParams.getAll('model') || [];
	const setSelectedModels = (models: string[]) => {
		setSearchParams({ ...filters, model: models }, { replace: true });
	};

	// Locations filter
	const locations = searchParams.getAll('location') || [];
	const setSelectedLocations = (locations: string[]) => {
		setSearchParams({ ...filters, location: locations }, { replace: true });
	};

	// Category Filter
	const categories = searchParams.getAll('category') || [];
	const setSelectedCategories = (categories: string[]) => {
		setSearchParams({ ...filters, category: categories }, { replace: true });
	};

	// Brand Filter
	const brands = searchParams.getAll('brand') || [];
	const setSelectedBrands = (brand: string[]) => {
		setSearchParams({ ...filters, brand: brand }, { replace: true });
	};

	// Type link filter
	const modelTypes = searchParams.getAll('modelType') || [];
	const setSelectedModelTypes = (modelTypes: string[]) => {
		setSearchParams({ ...filters, modelType: modelTypes }, { replace: true });
	};

	const filters = {
		...(models.length ? { model: models } : {}),
		...(locations.length ? { location: locations } : {}),
		...(categories.length ? { category: categories } : {}),
		...(brands.length ? { brand: brands } : {}),
		...(modelTypes.length ? { modelType: modelTypes } : {}),
	};

	// Fetch options
	const fetchDataOptions: GetAdvertisementParams = {
		pageIndex,
		pageSize,
		sort: sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
		sortBy: sorting.length ? sorting[0].id : undefined,
		locations: locations.length ? locations : undefined,
		categories: categories.length ? categories : undefined,
		brands: brands.length ? brands : undefined,
		models: models.length ? models : undefined,
		types: modelTypes.length ? modelTypes : undefined,
	};

	// Debounce the fetch options to avoid fetching too often
	const debouncedFetchDataOptions = useDebounce(fetchDataOptions, 300);

	// Fetch real estates
	const { isLoading, isFetching, data } = useQuery({
		queryKey: [QUERY_KEY.advertisements, debouncedFetchDataOptions],
		queryFn: () => getAdvertisements(debouncedFetchDataOptions),
		keepPreviousData: true,
		meta: {
			// Error message that will be displayed via toast if the query fails
			errorMessage: 'Неуспешно зареждане на обявите. Моля опитайте пак по-късно.',
		},
	});

	useQuery({
		queryKey: [QUERY_KEY.vehicleModels, brands[0]],
		queryFn: () => getVehicleModels(brands[0]),
		enabled: !!brands,
	});

	useQuery({
		queryKey: [QUERY_KEY.vehicleModelTypes, models[0]],
		queryFn: () => getVehicleModelTypes(models[0]),
		enabled: !!models,
	});

	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const defaultData = useMemo(() => [], []); // Default data is used when the real data is loading

	return (
		<div className="flex flex-col flex-1 h-full space-y-8">
			<div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Търсене</h2>
					<p className="text-muted-foreground">
						Намерете автомобилите, които търсите, използвайки филтрите по-долу.
					</p>
				</div>
				{data && (
					<div className="mt-2 md:mt-0">
						<div className="text-sm font-medium">Намерени резултати</div>
						<div className="text-2xl font-bold text-[#5fd045] md:text-right">{data?.meta?.total}</div>
					</div>
				)}
			</div>
			{!isLoading ? (
				<DataTable
					isFetching={isFetching}
					data={data?.data || defaultData}
					count={data?.meta?.total ?? -1}
					columns={columns}
					pagination={pagination}
					onSetPagination={setPagination}
					sorting={sorting}
					onSetSorting={setSorting}
					columnFilters={columnFilters}
					onSetColumnFilters={setColumnFilters}
					selectedModels={models}
					onSetSelectedModels={setSelectedModels}
					selectedLocations={locations}
					onSetSelectedLocations={setSelectedLocations}
					selectedCategories={categories}
					onSetSelectedCategories={setSelectedCategories}
					selectedBrands={brands}
					onSetSelectedBrands={setSelectedBrands}
					selectedModelTypes={modelTypes}
					onSetSelectedModelTypes={setSelectedModelTypes}
				/>
			) : (
				<span className="flex flex-row items-center text-muted-foreground">
					<Icons.spinner className="w-4 h-4 mr-2 animate-spin" /> Моля изчакайте...
				</span>
			)}
		</div>
	);
}

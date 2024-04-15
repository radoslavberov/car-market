import { useQuery } from '@tanstack/react-query';
import { getLocations, getUserAdvertisements, getVehicleBrands } from '@/data';
import { useState, useMemo } from 'react';
import { SortingState, ColumnFiltersState } from '@tanstack/react-table';
import { Icons } from '@/components/Icons';
import { columns } from '../marketplace/components/Columns';
import { DataTable } from '../marketplace/components/DataTable';
import { QUERY_KEY } from '@/data/constants';
import { GetAdvertisementParams } from '@/types';
import { useDebounce } from 'usehooks-ts';
import { useSearchParams } from 'react-router-dom';

export function UserAdvertismentsPage() {
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

	const { isLoading, isFetching, data } = useQuery({
		queryKey: [QUERY_KEY.userAdvertisements, debouncedFetchDataOptions],
		queryFn: () => getUserAdvertisements(debouncedFetchDataOptions),
		keepPreviousData: true,
		meta: {
			// Error message that will be displayed via toast if the query fails
			errorMessage: 'Неуспешно зареждане на обявите. Моля опитайте пак по-късно.',
		},
	});
	// Define pagination and default data for the table
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const defaultData = useMemo(() => [], []); // Default data is used when the real data is loading

	return (
		<div>
			{data && (
				<div className="mt-2 md:mt-0 mb-5">
					<div className="text-sm font-medium  md:text-right">Намерени резултати</div>
					<div className="text-2xl font-bold text-[#5fd045] md:text-right">{data?.meta?.total}</div>
				</div>
			)}
			<div className="flex flex-col flex-1 h-full space-y-8">
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
		</div>
	);
}

import { useMemo, useEffect, useState } from 'react';
import { columns } from './components/Columns';
import { DataTable } from './components/DataTable';
import { useQuery } from '@tanstack/react-query';
import { ColumnFiltersState, SortDirection, SortingState } from '@tanstack/react-table';
import {
	getAdvertisements,
} from '@/data';
import { Icons } from '@/components/Icons';
import { useLocation, useSearchParams } from 'react-router-dom';
import { QUERY_KEY } from '@/data/constants';
import { useAuth } from '@/hooks/auth.hook';
export function MarketplacePage() {
	const location = useLocation();

    // Get current user
	const { user } = useAuth();

	// Pagination, sorting and filtering states
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [searchParams] = useSearchParams();
	// Fetch options
	const fetchDataOptions: {
		pageIndex: number;
		pageSize: number;
		sort?: SortDirection;
		sortBy?: string;
		filters?: ColumnFiltersState;
	} = {
		pageIndex,
		pageSize,
		sort: sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
		sortBy: sorting.length ? sorting[0].id : undefined,
		filters: columnFilters.length ? columnFilters : undefined,
	};

	// // Fetch real estates
	// const { isLoading, isFetching, data } = useQuery({
	// 	queryKey: [QUERY_KEY.estates, fetchDataOptions],
	// 	queryFn: () => getAdvertisements(fetchDataOptions),
	// 	keepPreviousData: true,
	// 	meta: {
	// 		// Error message that will be displayed via toast if the query fails
	// 		errorMessage: 'Неуспешно зареждане на имотите. Моля опитайте пак по-късно.',
	// 	},
	// 	enabled: !!user,
	// });

	// Fetch real estates
	const { isLoading, isFetching, data } = useQuery({
		queryKey: [QUERY_KEY.advertisements],
		queryFn: () => getAdvertisements(),
		keepPreviousData: true,
		meta: {
			// Error message that will be displayed via toast if the query fails
			errorMessage: 'Неуспешно зареждане на обявите. Моля опитайте пак по-късно.',
		},
		enabled: !!user,
	});

	console.log(data)

	// // Load all the data we need for the filters
	// useQuery({ queryKey: [QUERY_KEY.estateTypes], queryFn: getEstateTypes });
	// useQuery({ queryKey: [QUERY_KEY.providers], queryFn: getProviders });

	// Data that will be passed to the DataTable component
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const defaultData = useMemo(() => [], []); // Default data is used when the real data is loading

	// Reset pageIndex to 0 whenever filters are added or removed
	useEffect(() => {
		setPagination((prevPagination) => ({
			...prevPagination,
			pageIndex: 0,
		}));
	}, [fetchDataOptions.filters]);

	// Update the URL with the current pagination, sorting and filtering states
	useEffect(() => {
		const url = new URL(window.location.href);

		url.searchParams.set('pageIndex', (fetchDataOptions.pageIndex + 1).toString());
		url.searchParams.set('limit', fetchDataOptions.pageSize.toString());

		// Clear existing filter parameters
		for (const paramName of url.searchParams.keys()) {
			if (!['pageIndex', 'limit'].includes(paramName)) {
				url.searchParams.delete(paramName);
			}
		}

		// Create a Map to keep track of added filter values
		const addedValuesMap = new Map();

		// Add filter values to the URL
		if (fetchDataOptions.filters) {
			for (const filter of fetchDataOptions.filters) {
				if (filter.value !== null && filter.value !== undefined) {
					if (Array.isArray(filter.value)) {
						if (!addedValuesMap.has(filter.id)) {
							addedValuesMap.set(filter.id, new Set());
						}
						for (const val of filter.value) {
							if (!addedValuesMap.get(filter.id).has(val)) {
								url.searchParams.append(filter.id, val);
								addedValuesMap.get(filter.id).add(val);
							}
						}
					} else {
						const val = filter.value.toString();
						if (!addedValuesMap.has(filter.id) || !addedValuesMap.get(filter.id).has(val)) {
							url.searchParams.append(filter.id, val);
							if (!addedValuesMap.has(filter.id)) {
								addedValuesMap.set(filter.id, new Set());
							}
							addedValuesMap.get(filter.id).add(val);
						}
					}
				}
			}
		}

		// Remove query parameters from URL that are not in fetchDataOptions.filters,
		// excluding 'pageIndex' and 'limit'
		for (const paramName of url.searchParams.keys()) {
			if (
				paramName !== 'pageIndex' &&
				paramName !== 'limit' &&
				(!fetchDataOptions.filters ||
					!fetchDataOptions.filters.some((filter) => filter.id) ||
					(searchParams.has(paramName) && searchParams.get(paramName) === ''))
			) {
				url.searchParams.delete(paramName);
			}
		}

		// Define the desired order of parameter names
		const desiredOrder = [
			'pageIndex',
			'limit',
			'location',
			'provider',
			'district',
			'constructionType',
			'estateType',
		];

		// Reorder query parameters to match desired order
		const paramsInOrder = new URLSearchParams();
		for (const paramName of desiredOrder) {
			if (url.searchParams.has(paramName)) {
				const paramValues = Array.from(new Set(url.searchParams.getAll(paramName))); // Ensure unique values
				for (const val of paramValues) {
					paramsInOrder.append(paramName, val);
				}
			}
		}

		// Replace the current URL with the updated URL
		url.search = paramsInOrder.toString();
		const updatedUrl = url.href.replace(/%5B%5D/g, '[]').replace(/%2C/g, ',');
		window.history.replaceState({ path: updatedUrl }, '', updatedUrl);
	}, [data, fetchDataOptions]);

	// Extract filter values from the URL
	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);

		const pageIndex = urlSearchParams.get('pageIndex');
		const limit = urlSearchParams.get('limit');

		// Read filter values from the URL
		const filterKeys = ['location', 'district', 'provider', 'constructionType', 'estateType'];
		const filterValues: Record<string, string[]> = {};

		filterKeys.forEach((key) => {
			filterValues[key] = urlSearchParams.getAll(key).map(String);
		});

		// Update your state with the values read from the URL
		if (pageIndex && limit) {
			setPagination({
				pageIndex: parseInt(pageIndex, 10) - 1,
				pageSize: parseInt(limit, 10),
			});
		}
		// Consolidate the filter values into filter objects
		const newFilters = [];

		for (const key in filterValues) {
			if (filterValues[key].length > 0) {
				const newFilter = { id: key, value: filterValues[key] };
				newFilters.push(newFilter);
			}
		}

		if (newFilters.length > 0) {
			setColumnFilters(newFilters);
		} else {
			setColumnFilters([]); // Clear the filter if no filter parameter is in the URL
		}
		// Handle other filter values here
	}, [location.search]);

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
						<div className="text-2xl font-bold text-[#5fd045] md:text-right">{data.length}</div>
					</div>
				)}
			</div>
			 {!isLoading ? (
				<DataTable
					isFetching={isFetching}
					data={data || defaultData}
					count={data?.length ?? -1}
					columns={columns}
					pagination={pagination}
					onSetPagination={setPagination}
					sorting={sorting}
					onSetSorting={setSorting}
					columnFilters={columnFilters}
					onSetColumnFilters={setColumnFilters}
				/>
			) : (
				<span className="flex flex-row items-center text-muted-foreground">
					<Icons.spinner className="w-4 h-4 mr-2 animate-spin" /> Моля изчакайте...
				</span>
			)}
		</div>
	);
}

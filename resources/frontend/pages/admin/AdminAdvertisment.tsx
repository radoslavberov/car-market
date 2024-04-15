import { useQuery } from '@tanstack/react-query';
import { getAdminPanelAnalyses } from '@/data';
import { useState, useMemo } from 'react';
import { SortingState, SortDirection } from '@tanstack/react-table';
import { AdvertismentDataTable } from './components/advertisments/AdminAdvertismentDataTable';
import { Icons } from '@/components/Icons';
import { columns } from './components/advertisments/AdminAdvertismentColumns';
import { debounce } from 'lodash';
import { QUERY_KEY } from '@/data/constants';

export function AdminAdvertismentsDashboardPage() {
	// Pagination and sorting states for data
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchEstateId, setsearchEstateId] = useState('');

	// Options for fetching data based on pagination and sorting
	const fetchDataOptions: {
		pageIndex: number;
		pageSize: number;
		sort?: SortDirection;
		sortBy?: string;
		search?: string;
		estateId?: string;
	} = {
		pageIndex,
		pageSize,
		sort: sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
		sortBy: sorting.length ? sorting[0].id : undefined,
		search: searchTerm ? searchTerm : undefined,
		estateId: searchEstateId ? searchEstateId : undefined,
	};

	// Get advertisements data
	const {
		isLoading,
		isFetching,
		data: advertisements,
	} = useQuery({
		queryKey: [QUERY_KEY.advertisements, fetchDataOptions],
		queryFn: () => getAdminPanelAnalyses(fetchDataOptions),
		keepPreviousData: true,
		meta: {
			// Error message that will be displayed via toast if the query fails
			errorMessage: 'Неуспешно зареждане на обяви. Моля опитайте пак по-късно.',
		},
	});


	// Define pagination and default data for the table
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const defaultData = useMemo(() => [], []); // Default data is used when the real data is loading

	// Search by userName and userEmail
	const debouncedSearch = debounce((term) => {
		setSearchTerm(term);
	}, 750);

	function handleSearch(value: string) {
		debouncedSearch(value);
	}

	// Search by estateId
	const debouncedSearchEstateId = debounce((term) => {
		setsearchEstateId(term);
	}, 750);

	function handleEstateIdSearch(value: string) {
		debouncedSearchEstateId(value);
	}

	return (
		<>
			<div className="space-y-4">
				<div className="flex flex-col flex-1 h-full space-y-8">
					{!isLoading ? (
						// Render when data is loaded
						<AdvertismentDataTable
							isFetching={isFetching}
							data={advertisements?.data || defaultData}
							count={advertisements?.meta?.total || -1}
							columns={columns}
							pagination={pagination}
							onSetPagination={setPagination}
							sorting={sorting}
							onSetSorting={setSorting}
							searchTerm={searchTerm}
							onSetSearchTerm={handleSearch}
							searchEstateId={searchEstateId}
							onSetSearchEstateId={handleEstateIdSearch}
						/>
					) : (
						// Display loading indicator while data is being fetched
						<span className="flex flex-row items-center text-muted-foreground">
							<Icons.spinner className="w-4 h-4 mr-2 animate-spin" /> Моля изчакайте...
						</span>
					)}
				</div>
			</div>
		</>
	);
}

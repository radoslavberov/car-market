import { useQuery } from '@tanstack/react-query';
import { getAdvertisements, getUserAdvertisements } from '@/data';
import { useState, useMemo } from 'react';
import { SortingState, SortDirection, ColumnFiltersState } from '@tanstack/react-table';
import { Icons } from '@/components/Icons';
import { columns } from '../marketplace/components/Columns';
import { DataTable } from '../marketplace/components/DataTable';
import { QUERY_KEY } from '@/data/constants';

export function UserAdvertismentsPage() {
	// Pagination and sorting states for analysis data
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	// Fetch options
	// // Options for fetching data based on pagination and sorting
	// const fetchDataOptions: {
	// 	pageIndex: number;
	// 	pageSize: number;
	// 	sort?: SortDirection;
	// 	sortBy?: string;
	// } = {
	// 	pageIndex,
	// 	pageSize,
	// 	sort: sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
	// 	sortBy: sorting.length ? sorting[0].id : undefined,
	// };

	// // Get analyses data
	// const {
	// 	isLoading,
	// 	isFetching,
	// 	data,
	// } = useQuery({
	// 	queryKey: ['analyses', fetchDataOptions],
	// 	queryFn: () => getUserAnalyses(fetchDataOptions),
	// 	keepPreviousData: true,
	// 	meta: {
	// 		// Error message that will be displayed via toast if the query fails
	// 		errorMessage: 'Неуспешно зареждане на анализите. Моля опитайте пак по-късно.',
	// 	},
	// });

	const { isLoading, isFetching, data } = useQuery({
		queryKey: [QUERY_KEY.userAdvertisements],
		queryFn: () => getUserAdvertisements(),
		keepPreviousData: true,
		meta: {
			// Error message that will be displayed via toast if the query fails
			errorMessage: 'Неуспешно зареждане на имотите. Моля опитайте пак по-късно.',
		},
	});

	// Define pagination and default data for the table
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const defaultData = useMemo(() => [], []); // Default data is used when the real data is loading

	return (
		<div className="flex flex-col flex-1 h-full space-y-8">
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

import { useQuery } from '@tanstack/react-query';
import { getUserAnalyses } from '@/data';
import { useState, useMemo } from 'react';
import { SortingState, SortDirection } from '@tanstack/react-table';
import { AnalysisDataTable } from './components/AnalysisDataTable';
import { Icons } from '@/components/Icons';
import { columns } from './components/AnalysisColumns';

export function AnalysesDashboardPage() {
	// Pagination and sorting states for analysis data
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);

	// Options for fetching data based on pagination and sorting
	const fetchDataOptions: {
		pageIndex: number;
		pageSize: number;
		sort?: SortDirection;
		sortBy?: string;
	} = {
		pageIndex,
		pageSize,
		sort: sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
		sortBy: sorting.length ? sorting[0].id : undefined,
	};

	// Get analyses data
	const {
		isLoading,
		isFetching,
		data: analyses,
	} = useQuery({
		queryKey: ['analyses', fetchDataOptions],
		queryFn: () => getUserAnalyses(fetchDataOptions),
		keepPreviousData: true,
		meta: {
			// Error message that will be displayed via toast if the query fails
			errorMessage: 'Неуспешно зареждане на анализите. Моля опитайте пак по-късно.',
		},
	});

	// Define pagination and default data for the table
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const defaultData = useMemo(() => [], []); // Default data is used when the real data is loading

	return (
		<>
			<div className="space-y-4">
				<div className="h-full flex-1 flex-col space-y-8 flex">
					{!isLoading ? (
						// Render AnalysisDataTable when data is loaded
						<AnalysisDataTable
							isFetching={isFetching}
							data={analyses?.rows || defaultData}
							count={analyses?.meta?.total || -1}
							columns={columns}
							pagination={pagination}
							onSetPagination={setPagination}
							sorting={sorting}
							onSetSorting={setSorting}
						/>
					) : (
						// Display loading indicator while data is being fetched
						<span className="flex flex-row items-center text-muted-foreground">
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Моля изчакайте...
						</span>
					)}
				</div>
			</div>
		</>
	);
}

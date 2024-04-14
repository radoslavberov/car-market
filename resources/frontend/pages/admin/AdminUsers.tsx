import { useQuery } from '@tanstack/react-query';
import { getAdminPanelUsers } from '@/data';
import { useState, useMemo } from 'react';
import { SortingState, SortDirection, ColumnFiltersState } from '@tanstack/react-table';
import { UsersDataTable } from './components/users/AdminUsersDataTable';
import { Icons } from '@/components/Icons';
import { columns } from './components/users/AdminUsersColumns';
import { debounce } from 'lodash';
import { QUERY_KEY } from '@/data/constants';

export function AdminUsersDashboardPage() {
	// Pagination and sorting states for users data
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [showActive, setShowActive] = useState<boolean | null>(null);
	const [showAdmins, setShowAdmins] = useState<boolean | null>(null);

	// Options for fetching data based on pagination and sorting, filtering and search
	const fetchDataOptions: {
		pageIndex: number;
		pageSize: number;
		sort?: SortDirection;
		sortBy?: string;
		search?: string;
		admin?: boolean | null;
		active?: boolean | null;
	} = {
		pageIndex,
		pageSize,
		sort: sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
		sortBy: sorting.length ? sorting[0].id : undefined,
		search: searchTerm ? searchTerm : undefined,
		active: showActive,
		admin: showAdmins,
	};

	// Get users data
	const {
		isLoading,
		isFetching,
		data: users,
	} = useQuery({
		queryKey: [QUERY_KEY.users, fetchDataOptions],
		queryFn: () => getAdminPanelUsers(fetchDataOptions),
		keepPreviousData: true,
		meta: {
			// Error message that will be displayed via toast if the query fails
			errorMessage: 'Неуспешно зареждане на потребителите. Моля опитайте пак по-късно.',
		},
	});

	// Define pagination and default data for the table
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const defaultData = useMemo(() => [], []); // Default data is used when the real data is loading

	// Search
	const debouncedSearch = debounce((term) => {
		setSearchTerm(term);
	}, 750);

	function handleSearch(value: string) {
		debouncedSearch(value);
	}

	return (
		<>
			<div className="space-y-4">
				<div className="flex flex-col flex-1 h-full space-y-8">
					{!isLoading ? (
						<UsersDataTable
							isFetching={isFetching}
							data={users?.rows || defaultData}
							count={users?.meta?.total || -1}
							columns={columns}
							pagination={pagination}
							onSetPagination={setPagination}
							sorting={sorting}
							onSetSorting={setSorting}
							columnFilters={columnFilters}
							onSetColumnFilters={setColumnFilters}
							showActive={showActive}
							onSetShowActive={setShowActive}
							showAdmins={showAdmins}
							onSetShowAdmins={setShowAdmins}
							searchTerm={searchTerm}
							onSetSearchTerm={handleSearch}
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

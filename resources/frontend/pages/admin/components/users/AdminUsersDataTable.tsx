import * as React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	// getFilteredRowModel,
	//getPaginationRowModel,
	//getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { DataTablePagination } from '@/components/DataTablePagination';
import { cn } from '@/lib/utils';
import { UsersDataTableToolbar } from './AdminUsersDataTableToolbar';

interface DataTableProps<TData, TValue> {
	isFetching: boolean;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	count: number;
	pagination: {
		pageIndex: number;
		pageSize: number;
	};
	onSetPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
	sorting: SortingState;
	onSetSorting: React.Dispatch<React.SetStateAction<SortingState>>;
	columnFilters: ColumnFiltersState;
	onSetColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
	showActive: boolean | null;
	onSetShowActive: React.Dispatch<React.SetStateAction<boolean | null>>;
	showAdmins: boolean | null;
	onSetShowAdmins: React.Dispatch<React.SetStateAction<boolean | null>>;
	searchTerm: string;
	onSetSearchTerm: (value: string) => void;
}

export function UsersDataTable<TData, TValue>({
	isFetching,
	columns,
	data,
	count,
	pagination,
	onSetPagination: setPagination,
	sorting,
	onSetSorting: setSorting,
	columnFilters,
	onSetColumnFilters: setColumnFilters,
	showActive,
	onSetShowActive,
	showAdmins,
	onSetShowAdmins,
	searchTerm,
	onSetSearchTerm,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			pagination,
			columnVisibility,
			columnFilters,
			rowSelection,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		pageCount: Math.ceil(count / pagination.pageSize),
		manualFiltering: true,
		manualPagination: true,
		manualSorting: true,
		// @ts-ignore
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		// getFilteredRowModel: getFilteredRowModel(),
		//getPaginationRowModel: getPaginationRowModel(),
		// getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className={cn('space-y-4', isFetching && 'opacity-50')}>
			<UsersDataTableToolbar
				table={table}
				showActive={showActive}
				onSetShowActive={onSetShowActive}
				showAdmins={showAdmins}
				onSetShowAdmins={onSetShowAdmins}
				searchTerm={searchTerm}
				onSetSearchTerm={onSetSearchTerm}
			/>
			<DataTablePagination table={table} />
			<div className="border rounded-md bg-background">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Не открихме резултати по зададените филтри.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}

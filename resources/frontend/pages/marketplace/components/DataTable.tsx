import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { DataTablePagination } from '@/components/table/Pagination';
import { DataTableToolbar } from './DataTableToolbar';
import { cn } from '@/lib/utils';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	useReactTable,
} from '@tanstack/react-table';

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
	selectedModels: string[];
	onSetSelectedModels: (languages: string[]) => void;
	selectedLocations: string[];
	onSetSelectedLocations: (countries: string[]) => void;
	selectedCategories: string[];
	onSetSelectedCategories: (categories: string[]) => void;
	selectedBrands: string[];
	onSetSelectedBrands: (niches: string[]) => void;
	selectedModelTypes: string[];
	onSetSelectedModelTypes: (niches: string[]) => void;
}

export function DataTable<TData, TValue>({
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
	selectedModels,
	onSetSelectedModels,
	selectedLocations,
	onSetSelectedLocations,
	selectedCategories,
	onSetSelectedCategories,
	selectedBrands,
	onSetSelectedBrands,
	selectedModelTypes,
	onSetSelectedModelTypes,
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
			rowSelection,
			columnFilters,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		pageCount: Math.ceil(count / pagination.pageSize),
		manualFiltering: true,
		manualPagination: true,
		manualSorting: true,
		onColumnFiltersChange: setColumnFilters,
		// @ts-ignore
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className={cn('space-y-4', isFetching && 'opacity-50')}>
			<DataTableToolbar
				table={table}
				selectedModels={selectedModels}
				onSetSelectedModels={onSetSelectedModels}
				selectedLocations={selectedLocations}
				onSetSelectedLocations ={onSetSelectedLocations}
				selectedCategories ={selectedCategories}
				onSetSelectedCategories={onSetSelectedCategories}
				selectedBrands={selectedBrands}
				onSetSelectedBrands={onSetSelectedBrands}
				selectedModelTypes={selectedModelTypes}
				onSetSelectedModelTypes={onSetSelectedModelTypes}
			/>
			<DataTablePagination table={table} />
			<div className="border rounded-md bg-background">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header, index) => {
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
							table.getRowModel().rows.map((row, rowIndex) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className={cn(rowIndex % 2 !== 0 && 'bg-body')}
								>
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
									Не са открити обяви.
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

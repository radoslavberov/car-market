import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	search?: string;
	onSetSearch?: (search: string) => void;
	searchPlaceholder?: string;
}

export function DataTablePagination<TData>({
	table,
	search,
	onSetSearch: setSearch,
	searchPlaceholder,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 sm:flex-row sm:justify-end">
			{/* Search */}
			{search !== undefined && setSearch !== undefined && (
				<div className="flex-1 inline text-sm text-muted-foreground min-w-[100px]">
					<Input
						placeholder={searchPlaceholder || 'Search...'}
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						className="h-8 w-full sm:w-[150px] lg:w-[250px]"
					/>
				</div>
			)}

			{table.getPageCount() > 0 && (
				<div className="flex items-center space-x-2 md:space-x-6 lg:space-x-8">
					{/* Rows per page */}
					<div className="flex items-center space-x-2">
						<p className="hidden text-sm font-medium sm:inline">Rows</p>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value));
							}}
						>
							<SelectTrigger className="h-8 w-[70px]">
								<SelectValue placeholder={table.getState().pagination.pageSize} />
							</SelectTrigger>
							<SelectContent side="top">
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Current page */}
					<span className="hidden sm:flex w-[100px] text-sm font-medium justify-center">
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</span>
					<span className="flex justify-center text-sm font-medium sm:hidden">
						Page {table.getState().pagination.pageIndex + 1}
					</span>

					{/* Page control */}
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							className="hidden w-8 h-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to first page</span>
							<ChevronsLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							className="w-8 h-8 p-0"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							className="w-8 h-8 p-0"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRight className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							className="hidden w-8 h-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to last page</span>
							<ChevronsRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

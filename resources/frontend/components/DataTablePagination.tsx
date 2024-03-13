import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

// Function for scrolling to the top of the window
function ScrollToTop() {
	setTimeout(function () {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, 2);
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-center px-2 sm:justify-end">
			{/* Selected */}
			{/* <div className="flex-1 hidden text-sm text-muted-foreground sm:inline">
				{table.getFilteredSelectedRowModel().rows.length} of{' '}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div> */}
			<div className="flex items-center space-x-2 md:space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="hidden text-sm font-medium sm:inline">Редове на страница</p>
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
				<div className="text-sm font-medium">
					<span>Страница {table.getState().pagination.pageIndex + 1} </span>
					<span className="hidden md:inline">от {table.getPageCount()}</span>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden w-8 h-8 p-0 lg:flex"
						onClick={() => {
							ScrollToTop();
							table.setPageIndex(0);
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Отидете на първа страница</span>
						<ChevronsLeft className="w-4 h-4" />
					</Button>
					<Button
						variant="outline"
						className="w-8 h-8 p-0"
						onClick={() => {
							ScrollToTop();
							table.previousPage();
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Към предишната страница</span>
						<ChevronLeft className="w-4 h-4" />
					</Button>
					<Button
						variant="outline"
						className="w-8 h-8 p-0"
						onClick={() => {
							ScrollToTop();
							table.nextPage();
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Към следващата страница</span>
						<ChevronRight className="w-4 h-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden w-8 h-8 p-0 lg:flex"
						onClick={() => {
							ScrollToTop();
							table.setPageIndex(table.getPageCount() - 1);
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Отидете на последната страница</span>
						<ChevronsRight className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

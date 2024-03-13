import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AnalySisDataTableViewOptions } from './AdminAnalysisDataTableViewOptions';
import { useRef } from 'react';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	searchTerm: string;
	onSetSearchTerm: (value: string) => void;
	searchEstateId: string;
	onSetSearchEstateId: (value: string) => void;
}

export function AnalysisDataTableToolbar<TData>({
	table,
	searchTerm,
	onSetSearchTerm: setSearchTerm,
	searchEstateId,
	onSetSearchEstateId: setSearchEstateId,
}: DataTableToolbarProps<TData>) {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const estateSearchInputRef = useRef<HTMLInputElement>(null);

	const isFiltered = searchTerm !== '' || searchEstateId !== '';

	const clearFiltersHandler = () => {
		setSearchTerm('');
		setSearchEstateId('');
		if (searchInputRef.current) searchInputRef.current.value = '';
		if (estateSearchInputRef.current) estateSearchInputRef.current.value = '';
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-wrap items-center flex-1 gap-2">
				{/* Search by userName and userEmail */}
				<Input
					ref={searchInputRef}
					placeholder="Търсене по име/имейл на създател..."
					onChange={(event) => setSearchTerm(event.target.value)}
					className="h-8 w-[200px] lg:w-[300px]"
				/>

				{/* Search by estateId */}
				<Input
					ref={estateSearchInputRef}
					placeholder="Търсене по ID на имот..."
					onChange={(event) => setSearchEstateId(event.target.value)}
					className="h-8 w-[200px] lg:w-[250px]"
				/>

				{/* Clear filters */}
				{isFiltered && (
					<Button variant="ghost" onClick={clearFiltersHandler} className="h-8 px-2 lg:px-3">
						Изчисти
						<X className="w-4 h-4 ml-2" />
					</Button>
				)}
			</div>

			{/* Control table columns */}
			<AnalySisDataTableViewOptions table={table} />
		</div>
	);
}

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';
import { UsersDataTableViewOptions } from './AdminUsersDataTableViewOptions';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { useRef } from 'react';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	showActive: boolean | null;
	onSetShowActive: React.Dispatch<React.SetStateAction<boolean | null>>;
	showAdmins: boolean | null;
	onSetShowAdmins: React.Dispatch<React.SetStateAction<boolean | null>>;
	searchTerm: string;
	onSetSearchTerm: (value: string) => void;
}

export function UsersDataTableToolbar<TData>({
	table,
	showActive,
	onSetShowActive: setShowActive,
	showAdmins,
	onSetShowAdmins: setShowAdmins,
	searchTerm: searchTerm,
	onSetSearchTerm: setSearchTerm,
}: DataTableToolbarProps<TData>) {
	const searchInputRef = useRef<HTMLInputElement>(null);

	const isFiltered = typeof showActive === 'boolean' || typeof showAdmins === 'boolean' || searchTerm !== '';

	const clearFiltersHandler = () => {
		setShowActive(null);
		setShowAdmins(null);
		setSearchTerm('');
		if (searchInputRef.current) searchInputRef.current.value = '';
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-wrap items-center flex-1 gap-2">
				{/* Search */}
				<Input
					ref={searchInputRef}
					placeholder="Търсене по име/имейл..."
					onChange={(event) => setSearchTerm(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>

				{/* Show active */}
				<Button
					onClick={() => {
						if (showActive === true) setShowActive(null);
						else setShowActive(true);
					}}
					variant="outline"
					className="h-8 border-dashed"
				>
					<Icons.check className={cn('mr-2 h-4 w-4', showActive === true && 'text-brand')} />
					Активни
				</Button>

				{/* Show non-active (disabled) users */}
				<Button
					onClick={() => {
						if (showActive === false) setShowActive(null);
						else setShowActive(false);
					}}
					variant="outline"
					className="h-8 border-dashed"
				>
					<Icons.close className={cn('mr-2 h-4 w-4', showActive === false && 'text-brand')} />
					Неактивни
				</Button>

				{/* Show admins */}
				<Button
					onClick={() => {
						if (showAdmins === true) setShowAdmins(null);
						else setShowAdmins(true);
					}}
					variant="outline"
					className="h-8 border-dashed"
				>
					<Icons.admin className={cn('mr-2 h-4 w-4', showAdmins === true && 'text-brand')} />
					Администратори
				</Button>

				{/* Show normal users */}
				<Button
					onClick={() => {
						if (showAdmins === false) setShowAdmins(null);
						else setShowAdmins(false);
					}}
					variant="outline"
					className="h-8 border-dashed"
				>
					<Icons.user className={cn('mr-2 h-4 w-4', showAdmins === false && 'text-brand')} />
					Нормални потребители
				</Button>

				{/* Clear filters */}
				{isFiltered && (
					<Button variant="ghost" onClick={clearFiltersHandler} className="h-8 px-2 lg:px-3">
						Изчисти
						<X className="w-4 h-4 ml-2" />
					</Button>
				)}
			</div>
			{/* Control table columns */}
			<UsersDataTableViewOptions table={table} />
		</div>
	);
}

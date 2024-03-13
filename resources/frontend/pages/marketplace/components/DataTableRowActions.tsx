import { Row } from '@tanstack/react-table';
import { Icons } from '@/components/Icons';
import { MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/toast.hook';
import { makeFavorite, removeFavorite, getFavorites } from '@/data';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Estate } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/data/constants';
import { cn } from '@/lib/utils';
interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	const queryClient = useQueryClient();

	// Get the estate data
	const estate = row.original as Estate;

	// Fetch favorite data
	const { data, isFetching } = useQuery({ queryKey: [QUERY_KEY.favorites], queryFn: getFavorites });

	// Check if estate is in favorites
	const favorite = useMemo(() => data?.find((favorite) => favorite.estateId === estate.id), [data, estate.id]);

	// Function to handle adding/removing favorite
	const handleFavorites = async () => {
		try {
			// Toggle favorite status for estate
			if (favorite) await removeFavorite(favorite.id);
			else await makeFavorite(estate.id);

			// Show success message
			toast({
				title: `Имот #${estate.id} ${favorite ? 'премахнат от' : 'добавен в'} любими`,
			});

			// Refetch favorites
			queryClient.invalidateQueries([QUERY_KEY.favorites]);
		} catch (error) {
			// Handle error (e.g., show a toast message)
			toast({
				title: 'Възникна грешка',
				description: favorite
					? 'Проблем при премахване от любими. Моля, опитайте по-късно.'
					: 'Проблем при добавяне в любими. Моля, опитайте по-късно.',
				variant: 'destructive',
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<MoreHorizontal className="w-4 h-4" />
					<span className="sr-only">Отваряне на менюто</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem onClick={handleFavorites}>
					{isFetching ? (
						<Icons.spinner className="mr-2 h-3.5 w-3.5 animate-spin text-muted-foreground/70" />
					) : (
						<Icons.star
							className={cn('mr-2 h-3.5 w-3.5', favorite ? 'text-brand' : 'text-muted-foreground/70')}
						/>
					)}
					{favorite ? 'Премахни от любими' : 'Добави в любими'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

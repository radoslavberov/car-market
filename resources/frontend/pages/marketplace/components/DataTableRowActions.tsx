import { Row } from '@tanstack/react-table';
import { Icons } from '@/components/Icons';
import { MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/toast.hook';
import { makeFavorite, removeFavorite, getFavorites, getAdvertisements } from '@/data';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Advertisement } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/data/constants';
import { cn } from '@/lib/utils';
interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	const queryClient = useQueryClient();

	// Get the estate data
	const estate = row.original as Advertisement;

	// Fetch favorite data
	const { data, isFetching } = useQuery({ queryKey: [QUERY_KEY.advertisements], queryFn: getAdvertisements });

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

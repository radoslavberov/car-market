import { Row } from '@tanstack/react-table';
import { MoreHorizontal, RepeatIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/data/constants';
import { toast } from '@/hooks/toast.hook';

import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { deactivateUser } from '@/data';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
	activeStatus: number;
}

export function UsersDataTableRowActions<TData>({ row, activeStatus }: DataTableRowActionsProps<TData>) {
	const queryClient = useQueryClient();

	function toggleUserIsActiveHandler() {
		try {
			const id: number = row.getValue('id');
			deactivateUser(id);
			toast({
				title: 'Успех',
				description: `Потребител #${id} ${activeStatus === 1 ? 'деактивиран' : 'активиран'} успешно!`,
				variant: 'default',
			});
			queryClient.invalidateQueries([QUERY_KEY.users]);
		} catch (error) {
			toast({
				title: 'Възникна грешка',
				description: 'Проблем при де/активиране на потребител!',
				variant: 'destructive',
			});
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<MoreHorizontal className="w-4 h-4" />
					<span className="sr-only">Отваряне на менюто</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem
					onClick={() => {
						toggleUserIsActiveHandler();
					}}
				>
					<RepeatIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					{activeStatus === 1 ? 'Деактивирай' : 'Активирай'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

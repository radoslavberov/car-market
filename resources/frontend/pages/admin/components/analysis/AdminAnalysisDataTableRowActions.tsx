import { Row } from '@tanstack/react-table';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/data/constants';
import { toast } from '@/hooks/toast.hook';

import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { deleteAnalysis } from '@/data';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function AnalysisDataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	const queryClient = useQueryClient();

	function deleteAnalysisHandler() {
		try {
			const id: number = row.getValue('id');
			deleteAnalysis(id);
			toast({
				title: 'Успех',
				description: `Анализ #${id} е изтрит успешно!`,
				variant: 'default',
			});
			queryClient.invalidateQueries([QUERY_KEY.analyses]);
		} catch (error) {
			toast({
				title: 'Възникна грешка',
				description: 'Проблем при изтриване на анализ!',
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
						deleteAnalysisHandler();
					}}
				>
					<Trash2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Изтрий
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

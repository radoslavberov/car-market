import { Row } from '@tanstack/react-table';
import { Copy, MoreHorizontal, Pen, Star, Trash } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function AnalysisDataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	//const estate = row.original;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Отваряне на менюто</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem>
					<Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Редактиране
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Създайте копие
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Star className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Любими
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Изтриване
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

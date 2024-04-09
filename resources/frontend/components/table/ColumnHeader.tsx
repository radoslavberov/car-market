import { Column } from '@tanstack/react-table';
import { Icon, Icons } from '../Icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
	tooltip?: string;
	Icon?: Icon;
}

const sortIconClassname = 'w-4 h-4';

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	tooltip,
	className,
	Icon,
}: DataTableColumnHeaderProps<TData, TValue>) {
	const canSort = column.getCanSort();

	// Sorting
	const sortIcon = !canSort ? null : column.getIsSorted() === 'desc' ? (
		<Icons.sortDesc className={sortIconClassname} />
	) : column.getIsSorted() === 'asc' ? (
		<Icons.sortAsc className={sortIconClassname} />
	) : (
		<Icons.chevronUpDown className={sortIconClassname} />
	);

	const button = (
		<Button
			variant="ghost"
			size="sm"
			className="h-8 bg-background hover:text-accent-foreground data-[state=open]:bg-accent flex items-center gap-2 px-0 py-2"
			onClick={() => canSort && column.toggleSorting()}
		>
			{Icon ? (
				<div className="flex flex-col items-center justify-center flex-1 w-full">
					<Icon className="h-3" />
					<span className="text-xs whitespace-nowrap">{title}</span>
				</div>
			) : (
				<span>{title}</span>
			)}
			{sortIcon}
		</Button>
	);

	const buttonWithTooltip = tooltip ? (
		<Tooltip>
			<TooltipTrigger>{button}</TooltipTrigger>
			<TooltipContent side="top" className="w-[325px] font-normal text-left">
				{tooltip}
			</TooltipContent>
		</Tooltip>
	) : null;

	return <div className={cn(className)}>{buttonWithTooltip || button}</div>;
}

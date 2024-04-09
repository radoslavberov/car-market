import { Table } from '@tanstack/react-table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Separator } from '@/components/ui/Separator';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import { MouseEvent } from 'react';

interface RangeFilter<TData> {
	table?: Table<TData>;
	title?: string;
	range: [number | null, number | null];
	onSetRange: React.Dispatch<React.SetStateAction<[number | null, number | null]>>;
	suffix?: string;
	rangeTo?: number | null;
}

export function RangeFilter<TData>({ table, title, range, rangeTo, onSetRange: setRange, suffix }: RangeFilter<TData>) {
	// Function to clear the set filter
	const handleClearRange = (event: MouseEvent) => {
		event.stopPropagation(); // Prevent the tooltip from opening

		table?.setPageIndex(0); // Go to the first page of the table
		setRange([null, null]); // Clear the filter's range values
	};

	// Track if filters are applied
	const areFiltersApplied = range[0] !== null || range[1] !== null;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className={cn(
						'h-8 border-dashed data-[state=open]:border-solid duration-100',
						areFiltersApplied
							? 'bg-primary hover:bg-primary/95 hover:text-secondary border-0 text-secondary' // Colors when filters are applied
							: 'data-[state=open]:bg-accent data-[state=open]:border-secondary', // Default colors
					)}
				>
					<Icons.plusCircle
						className={cn(
							'w-4 h-4 mr-2 transition-all duration-500',
							areFiltersApplied && 'rotate-45 text-destructive',
						)}
						onClick={(event) => areFiltersApplied && handleClearRange(event)}
					/>
					{title}
					<Separator orientation="vertical" className="h-4 mx-2" />
					<Badge variant="secondary" className="px-1 font-normal rounded-sm">
						from {range[0] ?? '0'} {suffix ?? null}
					</Badge>
					<Separator orientation="horizontal" className="w-1 mx-2" />
					<Badge variant="secondary" className="px-1 font-normal rounded-sm">
						to {range[1] ?? (rangeTo ? rangeTo.toString() : '∞')} {suffix ?? null}
					</Badge>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px]" align="start">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="from">From</Label>
						<Input
							type="number"
							id="from"
							placeholder={`0 ${suffix ?? ''}`}
							value={range[0] ?? ''}
							onChange={(e) => {
								e.preventDefault();
								table?.setPageIndex(0); // Go to first page
								setRange([Number(e.target.value), range[1]]);
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="to">To</Label>
						<Input
							type="number"
							id="to"
							placeholder={`${rangeTo ? rangeTo.toString() : `∞`} ${suffix ?? ''}`}
							value={range[1] ?? ''}
							onChange={(e) => {
								e.preventDefault();
								table?.setPageIndex(0); // Go to first page
								setRange([range[0], Number(e.target.value)]);
							}}
						/>
					</div>
					<Button
						variant="secondary"
						disabled={range[0] === null && range[1] === null}
						onClick={() => {
							table?.setPageIndex(0); // Go to first page
							setRange([null, null]);
						}}
					>
						Clear filter
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

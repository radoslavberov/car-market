// import { ColumnDef } from '@tanstack/react-table';
// import { Checkbox } from '@/components/ui/Checkbox';
// import { Analysis } from '@/types/index';
// import { AnalysisDataTableColumnHeader } from './AnalysisDataTableColumnHeader';
// import { buttonVariants } from '@/components/ui/Button';
// import { NavLink } from 'react-router-dom';
// import { intlFormatDistance } from 'date-fns';
// import { cn } from '@/lib/utils';
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
// import { Icons } from '@/components/Icons';
// import { Badge } from '@/components/ui/Badge';

// export const columns: ColumnDef<Analysis>[] = [
// 	{
// 		id: 'select',
// 		header: ({ table }) => (
// 			<Checkbox
// 				checked={table.getIsAllPageRowsSelected()}
// 				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
// 				aria-label="Select all"
// 				className="translate-y-[2px]"
// 			/>
// 		),
// 		cell: ({ row }) => (
// 			<Checkbox
// 				checked={row.getIsSelected()}
// 				onCheckedChange={(value) => row.toggleSelected(!!value)}
// 				aria-label="Select row"
// 				className="translate-y-[2px]"
// 			/>
// 		),
// 		enableSorting: false,
// 		enableHiding: false,
// 	},
// 	{
// 		accessorKey: 'id',
// 		header: ({ column }) => <AnalysisDataTableColumnHeader column={column} title="Анализ" />,
// 		cell: ({ row }) => <div className="flex flex-row items-center gap-2">#{row.getValue('id')}</div>,
// 	},
// 	{
// 		accessorKey: 'estateId',
// 		header: ({ column }) => <AnalysisDataTableColumnHeader column={column} title="Имот" />,
// 		cell: ({ row }) => (
// 			<div className="flex flex-row items-center gap-2">
// 				#{row.getValue('estateId')}
// 				<NavLink
// 					className={buttonVariants({ variant: 'outline', size: 'sm' })}
// 					to={`/estates/${row.getValue('estateId')}`}
// 				>
// 					Преглед
// 				</NavLink>
// 			</div>
// 		),
// 	},
// 	{
// 		accessorKey: 'score',
// 		header: ({ column }) => <AnalysisDataTableColumnHeader column={column} title="Оценка" />,
// 		cell: ({ row }) => (
// 			<span
// 				className={cn(
// 					'font-semibold',
// 					(row.getValue('score') as number) >= 50 ? 'text-brand' : 'text-destructive',
// 				)}
// 			>
// 				{row.getValue('score')}
// 			</span>
// 		),
// 	},
// 	{
// 		accessorKey: 'description',
// 		header: ({ column }) => <AnalysisDataTableColumnHeader column={column} title="Описание" />,
// 		cell: ({ row }) => {
// 			const description = row.getValue('description') as string; // Cast to string
// 			const truncatedDescription = description.length > 30 ? description.substring(0, 30) + '...' : description;
// 			return (
// 				<Tooltip>
// 					<TooltipTrigger asChild>
// 						<span className="flex flex-row items-center p-2 cursor-default">{truncatedDescription}</span>
// 					</TooltipTrigger>
// 					<TooltipContent side="bottom" className="max-w-2xl space-y-1">
// 						<p>{description}</p>
// 					</TooltipContent>
// 				</Tooltip>
// 			);
// 		},
// 		enableSorting: false,
// 		enableHiding: false,
// 	},
// 	{
// 		accessorKey: 'createdAt',
// 		header: ({ column }) => <AnalysisDataTableColumnHeader column={column} title="Дата" />,
// 		cell: ({ row }) => (
// 			<div>
// 				{row.original?.createdAt
// 					? intlFormatDistance(new Date(row.getValue('createdAt')), Date.now(), {
// 							locale: 'bg-BG',
// 					  })
// 					: ''}
// 			</div>
// 		),
// 	},
// 	// {
// 	// 	id: 'actions',
// 	// 	cell: ({ row }) => <AnalysisDataTableRowActions row={row} />,
// 	// },
// ];

'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';

// import { labels, priorities, statuses } from '../data';
import { Estate, Favorite } from '@/types/index';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTableRowActions } from './DataTableRowActions';
import { Button, buttonVariants } from '@/components/ui/Button';
import { NavLink } from 'react-router-dom';
import { intlFormatDistance } from 'date-fns';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

export const columns: ColumnDef<Estate>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Имот" />,
		cell: ({ row, table }) => {
			const estateId = row.getValue('id') as number;
			// @ts-ignore
			const favorite = table.options.meta?.favorites?.find(
				(favorite: Favorite) => favorite.estateId === estateId,
			);
			return (
				<div className="flex flex-row items-center gap-2">
					<span className="cursor-default">
						<Icons.star
							className={cn('h-3.5 w-3.5', favorite ? 'text-brand' : 'text-muted-foreground/70')}
						/>
					</span>
					{!row.original.active && (
						<Tooltip>
							<TooltipTrigger asChild>
								<span>
									<Icons.warning className="h-3.5 w-3.5 text-destructive" />
								</span>
							</TooltipTrigger>
							<TooltipContent side="bottom">Обявата за този имот не е активна!</TooltipContent>
						</Tooltip>
					)}
					<span className={cn(!row.original.active && 'line-through text-destructive')}>#{estateId}</span>
					<NavLink className={buttonVariants({ variant: 'outline', size: 'sm' })} to={`/estates/${estateId}`}>
						Преглед
					</NavLink>
				</div>
			);
		},
	},
	{
		id: 'estateType',
		accessorFn: (data) => data.estateType?.name,
		header: ({ column }) => <DataTableColumnHeader column={column} title="Тип" />,
		cell: ({ row }) =>
			row.getValue('estateType') ? (
				<Badge className="text-xs font-semibold whitespace-nowrap">{row.getValue('estateType')}</Badge>
			) : null,
	},
	{
		accessorKey: 'price',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Цена" />,
		cell: ({ row }) => (
			<div>
				{row.getValue('price') ? new Intl.NumberFormat('en-US').format(row.getValue('price')) + ' EUR' : ''}
			</div>
		),
	},
	{
		accessorKey: 'priceSquareMeters',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Цена/кв.м" />,
		cell: ({ row }) => (
			<div>
				{row.getValue('priceSquareMeters')
					? new Intl.NumberFormat('en-US').format(row.getValue('priceSquareMeters')) + ' EUR/m2'
					: ''}
			</div>
		),
	},
	{
		accessorKey: 'squareMeters',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Кв. метри" />,
		cell: ({ row }) => (
			<div>
				{row.getValue('squareMeters')
					? new Intl.NumberFormat('en-US').format(row.getValue('squareMeters')) + ' m2'
					: ''}
			</div>
		),
	},
	{
		id: 'location',
		accessorFn: (data) => data.location?.name.toUpperCase(),
		header: ({ column }) => <DataTableColumnHeader column={column} title="Местоп." className="w-24" />,
		cell: ({ row }) => <div>{row.getValue('location')}</div>,
	},
	{
		id: 'district',
		accessorFn: (data) => data.district?.name.toUpperCase(),
		header: ({ column }) => <DataTableColumnHeader column={column} title="Район" className="w-24" />,
		cell: ({ row }) => <div>{row.getValue('district')}</div>,
	},
	{
		accessorKey: 'year',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Година" />,
		cell: ({ row }) => <div>{row.getValue('year')}</div>,
	},
	{
		id: 'constructionType',
		accessorFn: (data) => data.constructionType?.name,
		header: ({ column }) => <DataTableColumnHeader column={column} title="Тип конструкция" />,
		cell: ({ row }) => <div>{row.getValue('constructionType')}</div>,
	},
	{
		accessorKey: 'provider',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Доставчик" />,
		cell: ({ row }) => <div>{row.getValue('provider')}</div>,
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Добавен" className="w-24" />,
		cell: ({ row }) => (
			<div>
				{row.original?.createdAt
					? intlFormatDistance(new Date(row.original.createdAt), Date.now(), {
							locale: 'bg-BG',
					  })
					: ''}
			</div>
		),
	},
	{
		accessorKey: 'crawledAt',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Обновен" className="w-24" />,
		cell: ({ row }) => (
			<div>
				{row.original?.crawledAt
					? intlFormatDistance(new Date(row.original.crawledAt), Date.now(), {
							locale: 'bg-BG',
					  })
					: ''}
			</div>
		),
	},
	{
		id: 'map',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Карта" />,
		cell: ({ row }) => {
			return (
				<div>
					<Button
						className="min-w-[100px]"
						variant="outline"
						size="sm"
						disabled={!row.original.latitude || !row.original.longitude}
						onClick={() => {
							row.original.latitude &&
								row.original.longitude &&
								window.open(
									`https://www.google.com/maps/search/?api=1&query=${row.original.latitude},${row.original.longitude}`,
									'_blank',
								);
						}}
					>
						Виж на карта
					</Button>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];

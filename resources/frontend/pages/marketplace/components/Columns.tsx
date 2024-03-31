'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';

// import { labels, priorities, statuses } from '../data';
import { Advertisement } from '@/types/index';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTableRowActions } from './DataTableRowActions';
import { Button, buttonVariants } from '@/components/ui/Button';
import { NavLink } from 'react-router-dom';
import { intlFormatDistance } from 'date-fns';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

export const columns: ColumnDef<Advertisement>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
		cell: ({ row }) => {
			const vehicleId = row.getValue('id') as number;
			return (
				<div className="flex flex-row items-center gap-2">
					<NavLink className={buttonVariants({ variant: 'outline', size: 'sm' })} to={`/estates/${vehicleId}`}>
						Преглед
					</NavLink>
				</div>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'vehicle',
		accessorFn: (data) => data.vehicleModelType?.name,
		header: ({ column }) => <DataTableColumnHeader className="w-full" column={column} title="Превозно средство" />,
		cell: ({ row }) => (
			<div>
				{row.original?.vehicleBrand?.name} {row.original?.vehicleModelType?.name}
			</div>
		),
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
		accessorKey: 'color',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Цвят" />,
		cell: ({ row }) => <div>{row.getValue('color')}</div>,
	},
	{
		accessorKey: 'fuel',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Тип гориво" />,
		cell: ({ row }) => <div>{row.original?.fuel?.name}</div>,
	},
	{
		id: 'location',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Местоп." className="w-24" />,
		cell: ({ row }) => <div>{row.original?.location?.name}</div>,
	},
	{
		id: 'mileage',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Мили" className="w-24" />,
		cell: ({ row }) => <div>{row.original?.mileage} мили</div>,
	},
	{
		accessorKey: 'year',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Година" />,
		cell: ({ row }) => <div>{row.getValue('year')}</div>,
	},
	{
		id: 'transmission',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Трансмисия" />,
		cell: ({ row }) => <div>{row.original?.transmission?.name}</div>,
	},
	{
		accessorKey: 'vehicleCategory',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Купе" />,
		cell: ({ row }) => <div>{row.original.vehicleCategory?.name}</div>,
	},
	{
		accessorKey: 'engineCapacity',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Капацитет на вдигателя" className="w-full m-auto" />,
		cell: ({ row }) => <div className="text-center">{row.original?.engine_capacity}</div>,
	},
	{
		accessorKey: 'horsePower',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Конски сили" className="w-24" />,
		cell: ({ row }) => (
			<div>
				{row.original?.horsePower} КС.
			</div>
		),
	},
];

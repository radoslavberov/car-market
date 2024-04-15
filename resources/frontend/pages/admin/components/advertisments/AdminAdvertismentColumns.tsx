'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Advertisement } from '@/types/index';
import { AdvertismentDataTableColumnHeader } from './AdminAdvertismentDataTableColumnHeader';
import { buttonVariants } from '@/components/ui/Button';
import { NavLink } from 'react-router-dom';
import { DeleteDialog } from '@/components/DeleteDialog';

export const columns: ColumnDef<Advertisement>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="" />,
		cell: ({ row }) => {
			const vehicleId = row.getValue('id') as number;
			return (
				<div className="flex flex-row items-center gap-2">
					<NavLink
						className={buttonVariants({ variant: 'outline', size: 'sm' })}
						to={`/advertisements/${vehicleId}`}
					>
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
		accessorFn: (data) => data?.name,
		header: ({ column }) => <AdvertismentDataTableColumnHeader className="w-full" column={column} title="Превозно средство" />,
		cell: ({ row }) => <div>{row.original?.name}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'vehicleCategory',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="Категория" />,
		cell: ({ row }) => <div>{row.original.vehicleCategory?.name}</div>,
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'price',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="Цена" />,
		cell: ({ row }) => (
			<div>
				{row.getValue('price') ? new Intl.NumberFormat('en-US').format(row.getValue('price')) + ' EUR' : ''}
			</div>
		),
	},
	{
		id: 'location',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="Местоп." className="w-24" />,
		cell: ({ row }) => <div>{row.original?.location?.name}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'year',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="Година" />,
		cell: ({ row }) => <div>{row.getValue('year')}</div>,
	},
	{
		accessorKey: 'fuel',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="Гориво" />,
		cell: ({ row }) => <div>{row.original?.fuel?.name}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'transmission',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="Трансмисия" />,
		cell: ({ row }) => <div>{row.original?.transmission?.name}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'delete',
		header: ({ column }) => <AdvertismentDataTableColumnHeader column={column} title="" />,
		cell: ({ row }) => {
			const vehicleId = row.getValue('id') as number;
			const urlContainsGaga = window.location.href.includes('advertisements');
			const urlContainsAdmin = window.location.href.includes('admin');
			// Render the delete button only if the user is admin
			if ( urlContainsGaga || urlContainsAdmin) {
				return (
					<div className="flex flex-row items-center gap-2">
						<DeleteDialog advertismentId={vehicleId} />
					</div>
				);
			}
		},
		enableSorting: false,
		enableHiding: false,
	},
];

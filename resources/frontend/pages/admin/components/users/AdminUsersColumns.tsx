'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/Checkbox';

// import { labels, priorities, statuses } from '../data';
import { AdminPanelUser } from '@/types/index';
import { UsersDataTableColumnHeader } from './AdminUsersDataTableColumnHeader';
import { UsersDataTableRowActions } from './AdminUsersDataTableRowActions';
import { intlFormatDistance } from 'date-fns';
import { Icons } from '@/components/Icons';

export const columns: ColumnDef<AdminPanelUser>[] = [
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
		enableHiding: true,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Потребител" />,
		cell: ({ row }) => <div className="flex flex-row items-center justify-center gap-2">#{row.getValue('id')}</div>,
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Име" />,
		cell: ({ row }) => <div className="flex flex-row items-center gap-2 ">{row.getValue('name')}</div>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Имейл" />,
		cell: ({ row }) => <div className="flex flex-row items-center gap-2">{row.getValue('email')}</div>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Дата на създаване" />,
		cell: ({ row }) => (
			<div>
				{row.original?.createdAt
					? intlFormatDistance(new Date(row.getValue('createdAt')), Date.now(), {
							locale: 'bg-BG',
					  })
					: ''}
			</div>
		),
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Дата на промяна" />,
		cell: ({ row }) => (
			<div>
				{row.original?.createdAt
					? intlFormatDistance(new Date(row.getValue('updatedAt')), Date.now(), {
							locale: 'bg-BG',
					  })
					: ''}
			</div>
		),
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: 'advertisementsDone',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Направени обяви" />,
		cell: ({ row }) => (
			<div className="flex flex-row items-center justify-center gap-2"> {row.getValue('advertisementsDone')}</div>
		),
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: 'isAdmin',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Администратор" />,
		cell: ({ row }) => (
			<div className="flex flex-row items-center gap-2">
				{row.getValue('isAdmin') === 1 ? (
					<Icons.check className="text-green-600" />
				) : (
					<Icons.x className="text-red-500" />
				)}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: 'active',
		header: ({ column }) => <UsersDataTableColumnHeader column={column} title="Активен" />,
		cell: ({ row }) => (
			<div className="flex flex-row items-center gap-2">
				{row.getValue('active') === 1 ? (
					<Icons.check className="text-green-600" />
				) : (
					<Icons.x className="text-red-500" />
				)}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},
	{
		id: 'actions',
		cell: ({ row }) => <UsersDataTableRowActions row={row} activeStatus={row.getValue('active')} />,
	},
];

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
	generateEstateAnalysis,
	getAdvertisement,
	getFavorites,
	makeFavorite,
	removeFavorite,
} from '@/data';
import { Euro, HardHat, Home, Expand, Hotel, Calendar, Bot } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Icons } from '@/components/Icons';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { intlFormatDistance } from 'date-fns';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';
import { Separator } from '@/components/ui/Separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { Analysis } from '@/types';
import { QUERY_KEY } from '@/data/constants';
import { PopulationChart } from './components/PopulationChart';
import { toast } from '@/hooks/toast.hook';
import { EstateLocationMap } from './components/EstateLocationMap';
import { ScrollArea } from '@/components/ui/ScrollArea';

const NO_INFO_TEXT = 'Няма инф.';

export function VehiclePage() {
	let { id } = useParams();
	const queryClient = useQueryClient();

	const { isLoading, data } = useQuery({
		queryKey: [QUERY_KEY.advertisement],
		queryFn: () => getAdvertisement(id),
	});
	console.log(data);
	return (
		<div className="flex flex-col flex-1 h-full space-y-8">
			<div className="flex flex-col justify-between gap-4 lg:items-center lg:flex-row">
				<div className="flex flex-row items-center gap-2">
					<span className="p-2 cursor-pointer md:p-4 group" onClick={() => window.history.back()}>
						<Icons.chevronLeft className="block w-8 h-8 text-muted-foreground group-hover:text-foreground" />
					</span>
					<div className="flex flex-col gap-1">
						{isError ? (
							<h2 className="text-3xl font-bold tracking-tight">Не намерихме имота, който търсите!</h2>
						) : (
							<h2 className="flex flex-row items-baseline gap-1 text-3xl font-bold tracking-tight">
								<span>
									{isLoading ? 'Имот' : `#${data?.id} - ${data?.estateType?.name ?? 'Имот'}`}
								</span>
							</h2>
						)}
						{isLoading ? (
							<p className="flex flex-row items-center text-muted-foreground">
								<Icons.spinner className="w-4 h-4 mr-2 animate-spin" /> Моля изчакайте, докато заредим
								информацията за имота.
							</p>
						) : isError ? (
							<p className="text-muted-foreground">
								Нямаме информация за имота, който търсите. Моля опитайте отново.
							</p>
						) : (
							<p className="flex flex-row items-center capitalize text-muted-foreground">
								<Icons.pin className="w-5 h-5 mr-2 text-brand" />
								<a
									className="cursor-pointer hover:underline"
									target="_blank"
									href={
										data?.latitude
											? `https://maps.google.com/?q=${data.latitude},${data.longitude}`
											: undefined
									}
								>
									{data?.location?.name}, {data?.district?.name}, {data?.latitude}, {data?.longitude}
								</a>
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Information */}
			<div className={cn(data ? 'grid' : 'hidden', 'gap-4 md:grid-cols-2 lg:grid-cols-4')}>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Цена</CardTitle>
						<Euro className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{new Intl.NumberFormat('en-US').format(Number(data?.price)) + ' EUR'}
						</div>
						{/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Цена/кв.м.</CardTitle>
						<Euro className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{new Intl.NumberFormat('en-US').format(Number(data?.priceSquareMeters)) + ' EUR/m2'}
						</div>
						{/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Площ (кв.м)</CardTitle>
						<Expand className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{new Intl.NumberFormat('en-US').format(Number(data?.squareMeters)) + ' m2'}
						</div>
						{/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Добавен</CardTitle>
						<Calendar className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{data?.createdAt
								? intlFormatDistance(new Date(data.createdAt), Date.now(), {
										locale: 'bg-BG',
								  })
								: ''}
						</div>
						<p className="text-xs text-muted-foreground">
							{data?.crawledAt
								? `Обновен ${intlFormatDistance(new Date(data.crawledAt), Date.now(), {
										locale: 'bg-BG',
								  })}`
								: ''}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Тип Имот</CardTitle>
						<Home className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.estateType?.name ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Тип Конструкция</CardTitle>
						<HardHat className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.constructionType?.name ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Етаж</CardTitle>
						<Hotel className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.floor ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Година</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.year ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
			</div>

			{/* Description */}
			<div className={cn(data ? 'grid' : 'hidden', 'grid-cols-1')}>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Описание</CardTitle>
					</CardHeader>
					<CardContent>
						{data?.description?.split('\n').map((item, i) => {
							return <p key={i}>{item}</p>;
						})}
						{/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

'use client';
import { useQuery } from '@tanstack/react-query';
import { getAdvertisement } from '@/data';
import { Euro, Palette, Flame, RefreshCw, CalendarCheck2, Car, LocateIcon, Heading, Phone } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Icons } from '@/components/Icons';
import { useParams } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { QUERY_KEY } from '@/data/constants';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carusel';
import { AddCommentDialog } from './components/AddCommentDialog';

const NO_INFO_TEXT = 'Няма инф.';

export function VehiclePage() {
	let { id } = useParams();
	const { isLoading, data } = useQuery({
		queryKey: [QUERY_KEY.advertisement, id],
		queryFn: () => getAdvertisement(id),
		enabled: !!id,
	});

	console.log(data);

	return (
		<div className="flex flex-col flex-1 h-full space-y-8">
			<div className="flex flex-col justify-between gap-4 lg:items-center lg:flex-row">
				<div className="flex flex-row items-center gap-2">
					<div className="p-2 cursor-pointer md:p-4 group" onClick={() => window.history.back()}>
						<Icons.chevronLeft className="block w-8 h-8 text-muted-foreground group-hover:text-foreground" />
					</div>
				</div>
				<div className="flex justify-between w-full">
					<div className="flex flex-col gap-1  pt-5">
						<h2 className="flex flex-row items-baseline gap-1 text-3xl font-bold tracking-tight">
							<span>{isLoading ? '' : data?.name}</span>
						</h2>
						{isLoading ? (
							<p className="flex flex-row items-center text-muted-foreground">
								<Icons.spinner className="w-4 h-4 mr-2 animate-spin" /> Моля изчакайте, докато заредим
								информацията за обявата.
							</p>
						) : (
							<p className="flex flex-row items-center capitalize text-muted-foreground">
								<Icons.pin className="w-5 h-5 mr-2 text-brand" />
								<p>{data?.location?.name}</p>
							</p>
						)}
					</div>
					<Card className="w-72">
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Контакт с продавача</CardTitle>
							<Phone className="w-4 h-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data?.user.phoneNumber}</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Information */}
			<div className={cn(data ? 'grid' : 'hidden', 'gap-4 md:grid-cols-2 lg:grid-cols-5')}>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Цена</CardTitle>
						<Euro className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{new Intl.NumberFormat('en-US').format(Number(data?.price)) + ' ЛВ'}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Цвят</CardTitle>
						<Palette className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.color ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Двигател</CardTitle>
						<Flame className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.fuel?.name ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Пробег</CardTitle>
						<RefreshCw className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.mileage ?? NO_INFO_TEXT} км</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Купе</CardTitle>
						<Car className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.vehicleCategory?.name ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Капацитет на двигателя</CardTitle>
						<Car className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{data?.engine_capacity ?? NO_INFO_TEXT} {data?.engine_capacity ? 'куб. см.' : ''}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Скоростна кутия</CardTitle>
						<Car className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.transmission?.name ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Година</CardTitle>
						<CalendarCheck2 className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.year ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Конски сили</CardTitle>
						<Heading className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.horsePower ?? NO_INFO_TEXT} кс</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Местоположение</CardTitle>
						<LocateIcon className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{data?.location.name ?? NO_INFO_TEXT}</div>
					</CardContent>
				</Card>
			</div>
			{!isLoading && data?.images?.length! > 0 && (
				<Carousel
					opts={{
						align: 'start',
					}}
				>
					<CarouselContent>
						{data?.images.map((image) => (
							<CarouselItem key={image.title} className=" pr-2">
								<Card className="h-full">
									<img
										src={`http://127.0.0.1:8000${image.path}`}
										alt={image.title}
										className="w-full h-full"
									/>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			)}

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
			<AddCommentDialog advertisment={data} />
			{data?.comments?.length! > 0 && (
				<Carousel
					opts={{
						align: 'start',
					}}
				>
					<CarouselContent>
						{data?.comments?.map((comment) => (
							<CarouselItem key={comment.id} className="md:basis-1/2 lg:basis-1/2 pr-2">
								<Card className="h-full">
									<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
										<CardTitle className="text-sm font-medium">{comment.user.name} </CardTitle>
										<span className="text-sm font-medium">{comment.createdAt}</span>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">{comment.description}</div>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			)}
		</div>
	);
}

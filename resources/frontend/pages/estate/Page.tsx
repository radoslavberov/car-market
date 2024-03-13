import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
	generateEstateAnalysis,
	getEstate,
	getEstateAnalyses,
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
const POLLING_INTERVAL = 10000; // 10 seconds
const MAX_POLLING_DURATION = 180000; // 3 minutes

export function EstatePage() {
	let { id } = useParams();
	const queryClient = useQueryClient();

	// Load estate data
	const { isLoading, data, isError } = useQuery({
		queryKey: [QUERY_KEY.estate, id],
		queryFn: () => getEstate(id),
		enabled: !!id,
	});

	// Load estate analyses
	const { data: analyses } = useQuery({
		queryKey: [QUERY_KEY.estateAnalyses, id],
		queryFn: () => getEstateAnalyses(id),
		enabled: !!id,
	});

	// Load estate favorites
	const { data: favoritesData } = useQuery({
		queryKey: [QUERY_KEY.favorites],
		queryFn: () => getFavorites(),
		enabled: !!id,
	});

	// State management for analysis loading and dialog
	const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
	const [isAnalysisDialogOpen, setIsAnalysisDialogOpen] = useState(false);
	const [analysis, setAnalysis] = useState<Analysis | null>(null);

	// State management for favorite loading and status
	const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	// Check if estate is in favorites
	const favorite = useMemo(
		() => favoritesData?.find((favorite) => favorite.estateId.toString() === id),
		[favoritesData, id],
	);

	// Create analysis for estate
	const analysisHandler = () => {
		if (isLoadingAnalysis) return;
		setIsLoadingAnalysis(true);

		// Generate estate analysis. Don't wait for it to finish - Cloudflare will return an error if it takes too long
		// Instead, poll for new results - poll for 3 minutes or until a new analysis is found
		generateEstateAnalysis(id).catch((e) => {
			// Handle estate analysis limit error
			if (e?.response?.status === 403) {
				setIsLoadingAnalysis(false);
				clearInterval(intervalId);

				toast({
					title: 'Достигнат лимит за анализи',
					description:
						'Месечният лимит за анализи е достигнат. Ще можете да направите нов анализ след началото на следващия месец!',
					variant: 'default',
				});
			}

			// Handle Cloudflare error
			else if (e?.response?.status === 504 || e?.response?.status === 524) {
				// Ignore error...
			}

			// Handle generic errors
			else {
				setIsLoadingAnalysis(false);
				clearInterval(intervalId);
				toast({
					title: 'Възникна грешка',
					description: 'Проблем при генерирането на анализа. Моля опитайте пак по-късно!',
					variant: 'destructive',
				});
			}
		});

		// Keep track of polling (to stop it after max duration)
		let pollingDuration = 0;

		// Keep track of analyses length (to stop polling after a new analysis is found)
		const beginingAnalysesLength = analyses?.length;

		// Keep track of polling count (to stop polling after the first iteration)
		let count = 0;

		const intervalId = setInterval(() => {
			// Check if analyses length has changed
			getEstateAnalyses(id).then((newAnalyses) => {
				if (newAnalyses && newAnalyses.length !== beginingAnalysesLength && count !== 1) {
					// Increase count
					count++;

					// Invalidate cache
					queryClient.invalidateQueries([QUERY_KEY.estateAnalyses, id]);
					queryClient.invalidateQueries([QUERY_KEY.auth]);

					// Stop polling if the length has changed
					clearInterval(intervalId);

					// Show analysis dialog
					setAnalysis(newAnalyses![newAnalyses.length - 1]);

					// Show analysis to user
					setIsAnalysisDialogOpen(true);
					setIsLoadingAnalysis(false);
				}
			});

			// Stop polling after max duration
			pollingDuration += POLLING_INTERVAL;
			if (pollingDuration >= MAX_POLLING_DURATION) {
				clearInterval(intervalId);
				setIsLoadingAnalysis(false);
			}
		}, POLLING_INTERVAL);
	};

	// Add/remove estate from favorites
	const favoriteHandler = async () => {
		if (isLoadingFavorite) return;
		setIsLoadingFavorite(true);
		try {
			if (isFavorite && favorite) {
				// If already a favorite, remove it
				await removeFavorite(favorite.id);
				setIsFavorite(false);
			} else {
				// If not a favorite, add it
				await makeFavorite(id);
				setIsFavorite(true);
			}

			// Refetch favorites
			queryClient.invalidateQueries([QUERY_KEY.favorites]);
		} catch (error) {
			// Handle error (e.g., show a toast message)
			if (isFavorite && favorite) {
				toast({
					title: 'Error',
					description: 'Failed to remove from favorites. Please try again later.',
					variant: 'destructive',
				});
			} else {
				toast({
					title: 'Error',
					description: 'Failed to add to favorites. Please try again later.',
					variant: 'destructive',
				});
			}
		}
		setIsLoadingFavorite(false);
	};

	// Set favorite status when data is loaded
	useEffect(() => {
		if (isLoadingFavorite) return;
		setIsLoadingFavorite(true);
		if (favorite) setIsFavorite(!!favorite);
		setIsLoadingFavorite(false);
	}, [id, favoritesData]);

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
								<span className={cn(data && !data.active && 'line-through text-muted-foreground')}>
									{isLoading ? 'Имот' : `#${data?.id} - ${data?.estateType?.name ?? 'Имот'}`}
								</span>
								{data && !data.active && (
									<Tooltip>
										<TooltipTrigger asChild>
											<span className="px-1 group">
												<Icons.warning className="w-5 h-5 text-destructive" />
											</span>
										</TooltipTrigger>
										<TooltipContent side="bottom">
											<span className="font-medium">Имотът е неактивен</span>
										</TooltipContent>
									</Tooltip>
								)}
								{data && (
									<Tooltip>
										<TooltipTrigger asChild>
											<span
												className={cn(
													'px-1 cursor-pointer group',
													isLoadingFavorite && 'cursor-default',
												)}
												onClick={favoriteHandler}
											>
												{isLoadingFavorite ? (
													<Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
												) : isFavorite ? (
													<Icons.star className="w-5 h-5 text-brand" />
												) : (
													<Icons.star className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
												)}
											</span>
										</TooltipTrigger>
										<TooltipContent side="bottom">
											<span className="font-medium">
												{isFavorite ? 'Добавен в любими' : 'Добави в любими'}
											</span>
										</TooltipContent>
									</Tooltip>
								)}
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
				{data && (
					<div className="flex items-center gap-4 lg:flex-none">
						{/* Offer button */}
						<a
							className={cn(
								buttonVariants({ variant: 'secondary', size: 'lg' }),
								'flex-2 relative cursor-pointer hover:bg-secondary md:flex-none',
							)}
							target="_blank"
							href={data.url}
						>
							<span className="hidden lg:inline">Виж Обява ({data.provider})</span>
							<span className="inline lg:hidden">Виж Обява</span>
						</a>

						{/* Analysis button */}
						<Dialog open={isAnalysisDialogOpen} onOpenChange={setIsAnalysisDialogOpen}>
							<div className="relative flex-1 group md:flex-none">
								<div
									className={cn(
										'absolute bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-50 transition duration-1000',
										isLoadingAnalysis
											? '-inset-0 opacity-25 duration-150'
											: '-inset-[1px] group-hover:opacity-100 duration-1000',
									)}
								></div>
								<Button
									variant="secondary"
									size="lg"
									className={cn(
										'w-full relative hover:bg-secondary',
										isLoadingAnalysis && 'cursor-default',
									)}
									onClick={async () => {
										await analysisHandler();
									}}
								>
									{isLoadingAnalysis ? (
										<>
											<Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
											<span className="inline">Моля, изчакайте</span>
										</>
									) : (
										<>
											<span className="hidden lg:inline">
												Направи анализ на имота с нашият AI
											</span>
											<span className="inline lg:hidden">AI Анализ</span>
										</>
									)}
								</Button>
							</div>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="flex flex-row items-center">
										<Bot className="w-4 h-4 mr-2" /> AI анализ на имот - #{data.id}
									</DialogTitle>
									<DialogDescription>
										Направихме анализ на имота, използвайки нашият AI. Вижте резултата по-долу.
									</DialogDescription>
								</DialogHeader>
								<ScrollArea className="max-h-[calc(100vh-200px)]">
									{analysis && (
										<div className="flex flex-col gap-4">
											<Separator />
											<p
												className={cn(
													'flex flex-row items-center text-xl font-semibold justify-center',
													analysis.score >= 50 ? 'text-brand' : 'text-destructive',
												)}
											>
												Оценка: {analysis.score}/100
											</p>
											<Separator />
											<div>
												<p className="font-semibold">Плюсове: </p>
												{analysis.pros.split('\n').map((pro, index) => (
													<p
														key={index}
														className="flex flex-row items-center gap-2 text-secondary-foreground"
													>
														<Icons.check className="h-4 text-brand" />
														<span>{pro}</span>
													</p>
												))}
											</div>
											<div>
												<p className="font-semibold">Минуси: </p>
												{analysis.cons.split('\n').map((con, index) => (
													<p
														key={index}
														className="flex flex-row items-center gap-2 text-secondary-foreground"
													>
														<Icons.close className="h-4 text-destructive" />
														<span>{con}</span>
													</p>
												))}
											</div>
											<div>
												<p className="font-semibold">Допълнителна информация: </p>
												<p>{analysis.description}</p>
											</div>
										</div>
									)}
								</ScrollArea>
								<DialogFooter>
									<DialogTrigger>
										<Button type="submit" onClick={() => {}}>
											Добре
										</Button>
									</DialogTrigger>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				)}
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

			{/* Analyses */}
			{analyses && analyses.length > 0 && (
				<>
					<h2 className="text-3xl font-bold tracking-tight">Анализи</h2>
					<div className="grid items-end grid-cols-1 gap-4 lg:grid-cols-2">
						{analyses.map((analysis, index) => (
							<Card key={analysis.id}>
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle>
										Анализ #{index + 1}{' '}
										<span className="ml-2 text-sm text-muted-foreground">
											{intlFormatDistance(new Date(analysis.createdAt), Date.now(), {
												locale: 'bg-BG',
											})}
										</span>
									</CardTitle>
									<span
										className={cn(
											'text-lg font-semibold',
											analysis.score >= 50 ? 'text-brand' : 'text-destructive',
										)}
									>
										Оценка: {analysis.score}/100
									</span>
								</CardHeader>
								<CardContent>
									<Separator className="mb-4" />
									<div className="flex flex-col gap-4">
										<div>
											<p className="font-semibold">Плюсове: </p>
											{analysis.pros.split('\n').map((pro, index) => (
												<p
													key={index}
													className="flex flex-row items-center gap-2 text-secondary-foreground"
												>
													<Icons.check className="h-4 text-brand" />
													{pro}
												</p>
											))}
										</div>
										<div>
											<p className="font-semibold">Минуси: </p>
											{analysis.cons.split('\n').map((con, index) => (
												<p
													key={index}
													className="flex flex-row items-center gap-2 text-secondary-foreground"
												>
													<Icons.close className="h-4 text-destructive" />
													{con}
												</p>
											))}
										</div>
										<div>
											<p className="font-semibold">Допълнителна информация: </p>
											<p>{analysis.description}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</>
			)}

			{/* Map View */}
			<EstateLocationMap lng={data?.longitude} lat={data?.latitude} hidden={!data} />

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

			{/* Population */}
			{data && data.population && data.population.length > 0 && (
				<div className="flex-col hidden gap-4 md:flex">
					<div className="flex flex-col gap-1">
						<h2 className="flex flex-row items-baseline gap-3 text-3xl font-bold tracking-tight">
							Население
							<Tooltip>
								<TooltipTrigger asChild>
									<span>
										<Icons.info className="w-4 h-4" />
									</span>
								</TooltipTrigger>
								<TooltipContent side="right" className="max-w-xl font-medium">
									Данните са извлечени от НСИ за 2022 година.
								</TooltipContent>
							</Tooltip>
						</h2>
						<p className="text-muted-foreground">
							Разделено по възрастови групи и пол за общината, в която се намира имота.
						</p>
					</div>
					<PopulationChart data={data.population} />
				</div>
			)}
		</div>
	);
}

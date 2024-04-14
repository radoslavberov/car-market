import { Activity, BarChart, MapPin, Car  } from 'lucide-react';
import { TabsContent } from '@/components/ui/Tabs';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/Card';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/data';
import { VehichelTypesChart } from './components/VehichelTypesChart';
import { VehichelCountChart } from './components/VehichelCountChart';
import { QUERY_KEY } from '@/data/constants';
// Get today's and yesterday's dates
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

// DashboardOverviewPage component
export function DashboardOverviewPage() {
	// Get dashboard stats
	const { data } = useQuery({
		queryKey: [QUERY_KEY.stats],
		queryFn: () => getDashboardStats(),
		keepPreviousData: true,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	// Get estate counts for today
	const advertisementsToday =
		data?.advertisementsCountLastWeek.find((i) => {
			return i.date === today;
		})?.count ?? 0;

	// Get estate counts for yesterday
	const advertisementsYesterday =
		data?.advertisementsCountLastWeek.find((i) => {
			return i.date === yesterday;
		})?.count ?? 0;


	return (
		<>
			{/* Tabs content */}
			<TabsContent value="overview" className="space-y-4">
				{/* Cards grid */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{/* Total Estates */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Брой обяви</CardTitle>
							<BarChart  className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data?.total.advertisements}</div>
							{/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
						</CardContent>
					</Card>

					{/* Total Locations */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Местоположения</CardTitle>
							<MapPin  className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data?.total.locations}</div>
							{/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
						</CardContent>
					</Card>

					{/* Total Districts */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Марки</CardTitle>
							<Car  className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data?.total.brands}</div>
							{/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
						</CardContent>
					</Card>

					{/* Estates Added Today */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Oбяви добавени днес</CardTitle>
							<Activity className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						{data && (
							<CardContent>
								<div className="text-2xl font-bold">{advertisementsToday}</div>
								<p className="text-xs text-muted-foreground">
									Oбяви добавени вчера: {advertisementsYesterday}
								</p>
							</CardContent>
						)}
					</Card>
				</div>

				{/* Second row of cards */}
				<div className="grid gap-4 grid-cols-7">
					{/* Newly added estates chart */}
					<Card className="col-span-7 lg:col-span-4">
						<CardHeader>
							<CardTitle>Нови обяви</CardTitle>
						</CardHeader>
						<CardContent className="pl-2">
							<VehichelCountChart />
						</CardContent>
					</Card>

					{/* Highest priced estates list */}
					<Card className="col-span-7 lg:col-span-3">
						<CardHeader>
							<CardTitle>Най-високи цени за марка автомобили</CardTitle>
							<CardDescription>Показаната цена е средна за марка автомобил в системата</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-8">
								{data?.getAveragePriceByBrand?.map((item, index) => (
									<div key={index} className="flex items-center">
										<div className="space-y-1">
											<p className="text-sm font-medium leading-none">
												{item.vehicleBrand?.toUpperCase() || 'Без намерено местоложение'}
											</p>
										</div>
										<div className="ml-auto font-medium text-[#5fd045]">
											~{new Intl.NumberFormat('en-US').format(Number(item.price)) + ' ЛВ'}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Estate types chart */}
					<Card className="col-span-7">
						<CardHeader>
							<CardTitle>Категории автомобили</CardTitle>
						</CardHeader>
						<CardContent className="pl-2">
							<VehichelTypesChart />
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</>
	);
}

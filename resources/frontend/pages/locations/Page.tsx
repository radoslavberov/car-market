import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDistricts, getLocations, getLocation } from '@/data';
import { Icons } from '@/components/Icons';
import { Euro, Expand, Info } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { NavLink } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { District, Location } from '@/types/index';
import { Label } from '@/components/ui/Label';
import { QUERY_KEY } from '@/data/constants';

export function LocationsPage() {
	const [selectedLocation, setSelectedLocation] = useState<Location | null | undefined>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<District | null | undefined>(null);

	const { data: locations } = useQuery({ queryKey: [QUERY_KEY.locations], queryFn: getLocations });
	const { data: districts } = useQuery({ queryKey: [QUERY_KEY.districts], queryFn: getDistricts });

	const { data, isLoading } = useQuery({
		queryKey: [QUERY_KEY.location, { id: selectedLocation?.id, districtId: selectedDistrict?.id }],
		queryFn: () => getLocation(selectedLocation?.id, selectedDistrict?.id),
		enabled: !!selectedLocation,
	});

	return (
		<div className="flex flex-col flex-1 h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Търсене по местоположение</h2>
					<p className="text-muted-foreground">Търсене по местоположение на имот</p>
				</div>
				{locations && (
					<div className="items-center hidden space-x-2 md:flex">
						<div>
							<div className="flex flex-row items-center justify-end space-y-0">
								<span className="text-sm font-medium">Брой местоположения</span>
							</div>
							<div className="text-2xl font-bold text-[#5fd045] text-end">{locations.length}</div>
						</div>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card className="col-span-1 md:col-span-2">
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-xl font-medium">Търсене</CardTitle>
						{/* <Info className="w-4 h-4 text-muted-foreground" /> */}
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2 max-w-[400px]">
								<Label>Избери местоположение</Label>
								<Select
									onValueChange={(item) => {
										locations &&
											setSelectedLocation(
												locations.find((location) => location.id === Number(item)),
											);
										setSelectedDistrict(null);
									}}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Местоположение" />
									</SelectTrigger>
									<SelectContent className="max-h-72">
										{locations &&
											locations.map((location) => (
												<SelectItem key={location.id} value={location.id.toString()}>
													{location.name.toUpperCase()}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
							{selectedLocation && districts && (
								<div className="flex flex-col gap-2 max-w-[400px]">
									<Label>Избери район/квартал</Label>
									<Select
										onValueChange={(item) => {
											setSelectedDistrict(
												districts.find((district) => district.id === Number(item)),
											);
										}}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Район/квартал" />
										</SelectTrigger>
										<SelectContent className="max-h-72">
											{districts
												.filter((i) => i.location?.id === selectedLocation?.id)
												.map((i) => {
													return (
														<SelectItem key={i.id} value={i.id.toString()}>
															{i.name.toUpperCase()}
														</SelectItem>
													);
												})}
										</SelectContent>
									</Select>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<Info className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent className="text-default text-muted-foreground">
						Търси по местоположение на имот. Може да избереш местоположение и район/квартал.
						<br />
						При избор на местоположение, ще се покажат статистики за средна цена, средна цена на кв.м. и
						средна площ на имотите в избраното местоположение.
					</CardContent>
				</Card>
			</div>
			{/* Information */}
			{selectedLocation && (
				<div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-2">
					<div className="flex flex-row items-center">
						<h3 className="text-xl font-semibold tracking-tight">
							Информация за{' '}
							<strong className="font-bold">
								{selectedLocation?.name.toUpperCase()}
								{selectedDistrict ? `, ${selectedDistrict.name.toUpperCase()}` : null}
							</strong>
						</h3>
						{isLoading && <Icons.spinner className="w-4 h-4 ml-2 animate-spin" />}
					</div>

					{data && (
						<div className="flex flex-row items-center gap-4">
							<NavLink
								className={buttonVariants({ variant: 'default', size: 'lg' })}
								to={`/marketplace?location=${selectedLocation?.id}${
									selectedDistrict ? `&district=${selectedDistrict.id}` : ''
								}`}
							>
								Преглед на имоти
							</NavLink>
						</div>
					)}
				</div>
			)}
			{data && (
				<div className="grid items-end gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Брой имоти</CardTitle>
							<Info className="w-4 h-4 text-muted-foreground" />
						</CardHeader>
						<CardContent className="flex flex-row items-center gap-2">
							<div className="text-2xl font-bold">{data?.estates.count}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Средна Цена</CardTitle>
							<Euro className="w-4 h-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{new Intl.NumberFormat('en-US').format(Number(data?.estates.averagePrice)) + ' EUR'}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Средна Цена/кв.м.</CardTitle>
							<Euro className="w-4 h-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{new Intl.NumberFormat('en-US').format(Number(data?.estates.averagePriceSquareMeters)) +
									' EUR/m2'}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Средна Площ</CardTitle>
							<Expand className="w-4 h-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{data &&
									new Intl.NumberFormat('en-US').format(Number(data.estates.averageSquareMeters)) +
										' m2'}
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}

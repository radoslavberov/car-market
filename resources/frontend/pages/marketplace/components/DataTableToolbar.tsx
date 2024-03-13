import { useQueryClient } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';

import { ConstructionType, District, EstateType, Location, Provider } from '@/types/index';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { Toggle } from '@/components/ui/Toggle';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { QUERY_KEY } from '@/data/constants';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	showFavorites: boolean;
	onSetShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTableToolbar<TData>({ table, showFavorites, onSetShowFavorites }: DataTableToolbarProps<TData>) {
	const queryClient = useQueryClient();

	// Use the query client to get the data from the cache
	const estateTypes = queryClient.getQueryData<EstateType[]>([QUERY_KEY.estateTypes]);
	const locations = queryClient.getQueryData<Location[]>([QUERY_KEY.locations]);
	const districts = queryClient.getQueryData<District[]>([QUERY_KEY.districts]);
	const constructionTypes = queryClient.getQueryData<ConstructionType[]>([QUERY_KEY.constructionTypes]);
	const providers = queryClient.getQueryData<Provider[]>([QUERY_KEY.providers]);

	const locationFilters = table.getColumn('location')?.getFilterValue() as string[] | undefined;

	const isFiltered = table.getAllColumns().some((column) => column.getIsFiltered());

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-wrap items-center flex-1 gap-2">
				{/* <Input
					placeholder="Филтриране на имоти..."
					value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/> */}

				{/* Estate types filter */}
				{estateTypes && table.getColumn('estateType') && (
					<DataTableFacetedFilter
						column={table.getColumn('estateType')}
						title="Тип имот"
						options={estateTypes.map((i) => ({
							label: i.name,
							value: i.id.toString(),
						}))}
					/>
				)}

				{/* Locations filter */}
				{locations && table.getColumn('location') && (
					<DataTableFacetedFilter
						column={table.getColumn('location')}
						title="Местоположение"
						options={locations.map((i) => ({
							label: i.name.toUpperCase(),
							value: i.id.toString(),
						}))}
					/>
				)}

				{/* District filter */}
				{locationFilters?.length && districts && table.getColumn('district') && (
					<DataTableFacetedFilter
						column={table.getColumn('district')}
						title="Район"
						options={districts
							.filter((d) => d.location?.id && locationFilters.includes(d.location.id.toString()))
							.map((i) => ({
								label: i.name.toUpperCase(),
								value: i.id.toString(),
							}))}
					/>
				)}

				{/* Construction type filter */}
				{constructionTypes && table.getColumn('constructionType') && (
					<DataTableFacetedFilter
						column={table.getColumn('constructionType')}
						title="Тип конструкция"
						options={constructionTypes.map((i) => ({
							label: i.name,
							value: i.id.toString(),
						}))}
					/>
				)}

				{/* Provider filter */}
				{providers && table.getColumn('provider') && (
					<DataTableFacetedFilter
						column={table.getColumn('provider')}
						title="Доставчик"
						options={providers.map((i) => ({
							label: i.name,
							value: i.id.toString(),
						}))}
					/>
				)}

				{/* Toggle show favorites */}
				<Toggle
					pressed={showFavorites}
					onPressedChange={(pressed) => {
						onSetShowFavorites(pressed);
						queryClient.invalidateQueries([QUERY_KEY.estates]);
					}}
					variant="outline"
					className="h-8 border-dashed"
				>
					<Icons.star className={cn('mr-2 h-4 w-4', showFavorites && 'text-brand')} />
					Покажи само любими
				</Toggle>

				{/* Clear filters */}
				{isFiltered && (
					<Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
						Изчисти
						<X className="w-4 h-4 ml-2" />
					</Button>
				)}
			</div>
		</div>
	);
}

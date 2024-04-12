import { useQueryClient } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/Button';
import { Location, VehicleBrand, VehicleModel, VehicleModelType } from '@/types/index';
import { QUERY_KEY, VEHICLE_TYPES_KEY } from '@/data/constants';
import { InFilter } from '@/components/table/filters/InFilter';
import { useSearchParams } from 'react-router-dom';
import { Icons } from '@/components/Icons';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	selectedModels: string[];
	onSetSelectedModels: (languages: string[]) => void;
	selectedLocations: string[];
	onSetSelectedLocations: (countries: string[]) => void;
	selectedCategories: string[];
	onSetSelectedCategories: (categories: string[]) => void;
	selectedBrands: string[];
	onSetSelectedBrands: (niches: string[]) => void;
	selectedModelTypes: string[];
	onSetSelectedModelTypes: (niches: string[]) => void;
}

export function DataTableToolbar<TData>({
	table,
	selectedModels,
	onSetSelectedModels,
	selectedLocations,
	onSetSelectedLocations,
	selectedCategories,
	onSetSelectedCategories,
	selectedBrands,
	onSetSelectedBrands,
	selectedModelTypes,
	onSetSelectedModelTypes,
}: DataTableToolbarProps<TData>) {
	const queryClient = useQueryClient();
	const vehicleCategories = Object.entries(VEHICLE_TYPES_KEY).map(([id, value]) => ({
		id,
		value,
	}));
	const [_, setSearchParams] = useSearchParams();

	// Use the query client to get the data from the cache
	const locations = queryClient.getQueryData<Location[]>([QUERY_KEY.locations]);
	const brands = queryClient.getQueryData<VehicleBrand[]>([QUERY_KEY.vehicleBrands]);
	const models = queryClient.getQueryData<VehicleModel[]>([QUERY_KEY.vehicleModels, selectedBrands[0]]);
	const modelTypes = queryClient.getQueryData<VehicleModelType[]>([QUERY_KEY.vehicleModelTypes, selectedModels[0]]);
	// Check if websites are filtered
	const isFiltered =
		selectedBrands.length > 0 ||
		selectedCategories.length > 0 ||
		selectedLocations.length > 0 ||
		selectedModels.length > 0 ||
		selectedModelTypes.length > 0;

	// Reset filters
	const handleResetFilters = () => {
		table.setPageIndex(0);
		setSearchParams({}, { replace: true });
	};
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-wrap items-center flex-1 gap-2">
				{/* Brands filter */}
				<InFilter
					key="brands"
					table={table}
					single={true}
					title="Марки"
					options={brands!.map((i) => ({
						label: i.name,
						value: i.id.toString(),
					}))}
					selectedValues={selectedBrands}
					onSetSelectedValues={(value) => {
						onSetSelectedBrands(value as string[]);
					}}
				/>

				{/* Categories filter */}
				<InFilter
					key="categories"
					table={table}
					title="Купе"
					options={vehicleCategories.map((i) => ({
						label: i.value,
						value: i.id.toString(),
					}))}
					selectedValues={selectedCategories}
					onSetSelectedValues={(value) => {
						onSetSelectedCategories(value as string[]);
					}}
				/>

				{/* Locations filter */}
				<InFilter
					key="locations"
					table={table}
					title="Местоположение"
					options={locations!.map((i) => ({
						label: i.name,
						value: i.id.toString(),
					}))}
					selectedValues={selectedLocations}
					onSetSelectedValues={(value) => {
						onSetSelectedLocations(value as string[]);
					}}
				/>

				{/* Vehicle models filter */}
				{models?.length! > 0 && (
					<InFilter
						key="vehicle_models"
						table={table}
						single={true}
						title="Модели"
						options={models!.map((i) => ({
							label: i.name,
							value: i.id.toString(),
						}))}
						selectedValues={selectedModels}
						onSetSelectedValues={(value) => {
							onSetSelectedModels(value as string[]);
						}}
					/>
				)}

				{/* Categories filter */}
				{modelTypes?.length! > 0 && (
					<InFilter
						key="vehicle_model_types"
						table={table}
						title="Вид модел"
						options={modelTypes!.map((i) => ({
							label: i.name,
							value: i.id.toString(),
						}))}
						selectedValues={selectedModelTypes}
						onSetSelectedValues={(value) => {
							onSetSelectedModelTypes(value as string[]);
						}}
					/>
				)}

				{/* Clear filters */}
				{isFiltered && (
					<Button variant="ghost" onClick={handleResetFilters} className="h-8 px-2 lg:px-3">
                        Премахни филтрите
						<Icons.close className="w-4 h-4 ml-2" />
					</Button>
				)}
			</div>
		</div>
	);
}

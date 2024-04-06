import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';
import { Icons } from '@/components/Icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/Calendar';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/toast.hook';
import { Textarea } from '@/components/ui/Textarea';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/Command';
import { Advertisement, AdvertisementInput } from '@/types';
import { addAdvertisment, editAdvertisment, getVehicleBrands, getVehicleModelTypes, getVehicleModels } from '@/data';
import { COLOURS_KEY, ENGINE_TYPES_KEY, QUERY_KEY, TRANSMISHIONS_KEY, VEHICLE_TYPES_KEY } from '@/data/constants';
import { forEach } from 'lodash';

const transmissionTypes = Object.entries(TRANSMISHIONS_KEY).map(([id, value]) => ({
	id,
	value,
}));

const colours = Object.entries(COLOURS_KEY).map(([id, value]) => ({
	id,
	value,
}));

const fuels = Object.entries(ENGINE_TYPES_KEY).map(([id, value]) => ({
	id,
	value,
}));

const vehicleCategories = Object.entries(VEHICLE_TYPES_KEY).map(([id, value]) => ({
	id,
	value,
}));

// Interface for component props
interface AdvertismentDialogProps {
	advertisment?: Advertisement;
	className?: string;
}

export function AdvertismentDialog({ className, advertisment }: AdvertismentDialogProps) {
	const queryClient = useQueryClient();

	// States
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [price, setPrice] = useState<number | undefined>(advertisment?.price);
	const [engineCapacity, setEngineCapacity] = useState<number | undefined>(advertisment?.engine_capacity);
	const [picture, setPicture] = useState<File>();
	const [date, setDate] = useState<Date>();

	const formData = new FormData();

	const [selectedFuel, setSelectedFuel] = useState<number | null>(advertisment?.fuel?.id || null);
	const [selecteFuelOpen, setSelecteFuelOpen] = useState(false);

	const [selectedTransmission, setSelectedTransmissionType] = useState<number | null>(
		advertisment?.transmission?.id || null,
	);
	const [selecteTransmissionOpen, setSelecteTransmissionOpen] = useState(false);

	const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<number | null>(
		advertisment?.transmission?.id || null,
	);
	const [selecteVehicleCategoryOpen, setSelecteVehicleCategoryOpen] = useState(false);

	const [selectedColor, setSelectedColor] = useState<string | null>(advertisment?.color || null);
	const [selecteColorOpen, setSelecteColorOpen] = useState(false);

	const [selecteVehicleBrandOpen, setSelecteVehicleBrandOpen] = useState(false);
	const [selectedVehicleBrand, setSelectedVehicleBrandType] = useState<number | null>(
		advertisment?.vehicleBrand?.id || null,
	);

	const [selectedVehicleModel, setSelectedVehicleModel] = useState<number | null>(
		advertisment?.vehicleModel?.id || null,
	);
	const [selecteVehicleModelOpen, setSelecteVehicleModelOpen] = useState(false);

	const [selectedVehicleModelType, setSelectedVehicleModelType] = useState<number | null>(
		advertisment?.vehicleModelType?.id || null,
	);

	const [selecteVehicleModelTypeOpen, setSelecteVehicleModelTypeOpen] = useState(false);

	// Load vehicle brands
	const { data: vehicleBrands } = useQuery({ queryKey: [QUERY_KEY.vehicleBrands], queryFn: getVehicleBrands });

	// Define state for vehicle models data
	const { data: vehicleModels } = useQuery({
		queryKey: [QUERY_KEY.vehicleModels, selectedVehicleBrand],
		queryFn: () => getVehicleModels(selectedVehicleBrand),
		enabled: !!selectedVehicleBrand,
	});

	const { data: vehicleModelTypes } = useQuery({
		queryKey: [QUERY_KEY.vehicleModelTypes, selectedVehicleModel],
		queryFn: () => getVehicleModelTypes(selectedVehicleModel),
		enabled: !!selectedVehicleModel,
	});

	// Imame kukita maina
	useEffect(() => {
		setSelectedVehicleModel(null);
		setSelectedVehicleModelType(null);
	}, [selectedVehicleBrand]);

	useEffect(() => {
		setSelectedVehicleModelType(null);
	}, [selectedVehicleModel]);
	// Reset form state
	const resetForm = () => {
		reset();
	};

	// Form related stuff
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm();

	// Check if the form is disabled
	const isDisabled = isLoading;
	// Handle form submit.
	async function onCreate(data: AdvertisementInput) {
		if (isLoading) return;
		setIsLoading(true);
		try {
			// Call API to add the link
			for (const key in data) {
				// Convert numeric values to string if necessary
				const value = typeof data[key] === 'number' ? data[key].toString() : data[key];
				formData.append(key, value);
			}
			formData.append('fuel_id', selectedFuel!.toString()); // Convert to string if necessary
			formData.append('year', '2002'); // Assuming year is a string
			formData.append('location_id', '3'); // Assuming location_id is a string
			formData.append('vehicle_brand_id', selectedVehicleBrand!.toString()); // Convert to string if necessary
			formData.append('vehicle_model_id', selectedVehicleModel!.toString()); // Convert to string if necessary
			formData.append(
				'vehicle_model_type_id',
				selectedVehicleModelType ? selectedVehicleModelType.toString() : '',
			); // Convert to string if necessary
			formData.append('vehicle_category_id', selectedVehicleCategory!.toString()); // Convert to string if necessary
			formData.append('transmission_id', selectedTransmission!.toString()); // Convert to string if necessary
			formData.append('color', selectedColor!); // Assuming color is a string
			const newLink = await addAdvertisment(formData);
			// Update cached data
			// queryClient.setQueriesData([QUERY_KEY.advertisements], (oldData: any) => {
			// 	if (!oldData) return undefined;
			// 	return {
			// 		...oldData,
			// 		data: oldData.data.map((website: Website) => {
			// 			if (website.id === newLink.website.id)
			// 				return {
			// 					...website,
			// 					links: [...website.links, newLink],
			// 				};
			// 			return website;
			// 		}),
			// 	};
			// });

			// Show toast
			toast({
				title: 'Success',
				description: `Added advertisement`,
				variant: 'default',
			});

			// Close dialog
			setIsLoading(false);
			setOpen(false);
		} catch (e: any) {
			// Handle validation errors
			if (e.errors) {
				for (const property of [
					'color',
					'price',
					'mileage',
					'horse_power',
					'engine_capacity',
					'description',
					'year',
					'location_id',
					'vehicle_brand_id',
					'vehicle_model_id',
					'vehicle_category_id',
					'fuel_id',
					'transmission_id',
				]) {
					if (e.errors?.[property]) {
						setError(property, {
							type: 'manual',
							message: e.errors[property],
						});
					}
				}
			}
			// Handle generic errors
			else {
				toast({
					title: 'An error occurred',
					description: e.message,
					variant: 'destructive',
				});
			}
			// Reset loading state
			setIsLoading(false);
		}
	}

	async function onEdit(data: AdvertisementInput) {
		if (isLoading || !advertisment) return;
		setIsLoading(true);
		try {
			// Call API to edit the link
			const updatedLink = await editAdvertisment(data, advertisment!.id);

			// Update cached data
			// queryClient.setQueriesData([QUERY_KEY.websites], (oldData: any) => {
			// 	if (!oldData) return undefined;
			// 	return {
			// 		...oldData,
			// 		data: oldData.data.map((website: Website) => {
			// 			if (website.id === updatedLink.website.id)
			// 				return {
			// 					...website,
			// 					links: website.links.map((link: Link) => {
			// 						if (link.id === updatedLink.id) return updatedLink;
			// 						return link;
			// 					}),
			// 				};
			// 			return website;
			// 		}),
			// 	};
			// });
			// queryClient.setQueriesData([QUERY_KEY.website], (oldData: any) => {
			// 	if (!oldData) return undefined;
			// 	return {
			// 		...oldData,
			// 		links: oldData.links.map((link: Link) => {
			// 			if (link.id === updatedLink.id) return updatedLink;
			// 			return link;
			// 		}),
			// 	};
			// });

			// Show toast notification
			toast({
				title: 'Success',
				description: `Edited link - ${advertisment?.id}`,
				variant: 'default',
			});

			// Close the dialog
			reset();
			setIsLoading(false);
			setOpen(false);
		} catch (e: any) {
			toast({
				title: 'An error occurred',
				description: 'Cannot edit advertisment. Please try again later.',
				variant: 'destructive',
			});

			// Reset loading state
			setIsLoading(false);
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) resetForm();
				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				{advertisment ? (
					<Icons.edit className="w-3 h-6 border-0 cursor-pointer hover:text-primary/50" />
				) : (
					<Button size="sm" variant="outline" onClick={() => setOpen(true)}>
						<Icons.add className={cn('w-4 h-4', className)} />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="md:max-w-[1010px]" onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>
						{advertisment
							? `Редактиране на ${advertisment.vehicleBrand?.name} ${advertisment.vehicleModelType?.name}`
							: `Добавяне на нова обява`}
					</DialogTitle>
					<DialogDescription>Попълнете данните по-долу, за да създадете нова обява.</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit((data) => {
						{
							!advertisment
								? onCreate({
										...data,
								  } as unknown as AdvertisementInput)
								: onEdit({
										...data,
										vehicle_brand_id: selectedVehicleBrand,
										vehicle_model_id: selectedVehicleModel,
										vehicle_model_type_id: selectedVehicleModelType,
										vehicle_category_id: selectedVehicleCategory,
										transmission_id: selectedTransmission,
										color: selectedColor,
								  } as unknown as AdvertisementInput);
						}
					})}
				>
					<div className="flex w-full">
						<div className="flex flex-col w-full gap-4 mr-6">
							{/* Vehicle Brands */}
							<div className="space-y-2">
								<Label>
									Марка <span className="text-destructive">*</span>
								</Label>
								<Popover open={selecteVehicleBrandOpen} onOpenChange={setSelecteVehicleBrandOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between w-full',
												errors?.vehicle_brand_id && 'border-destructive',
											)}
										>
											{selectedVehicleBrand
												? vehicleBrands?.find(
														(vehicleBrand) => vehicleBrand.id === selectedVehicleBrand,
												  )?.name
												: 'Избери марка'}
											<Icons.chevronUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandList>
												<CommandEmpty>No results found.</CommandEmpty>
												<CommandGroup>
													{vehicleBrands?.map((vehicleBrand) => {
														const isSelected = selectedVehicleBrand === vehicleBrand.id;
														return (
															<CommandItem
																key={vehicleBrand.id}
																onSelect={() => {
																	if (errors.vehicle_brand_id) {
																		delete errors.vehicle_brand_id;
																	}
																	if (isSelected) setSelectedVehicleBrandType(null);
																	else setSelectedVehicleBrandType(vehicleBrand.id);
																	setSelecteVehicleBrandOpen(false);
																}}
															>
																<div
																	className={cn(
																		'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
																		isSelected
																			? 'bg-primary text-primary-foreground'
																			: 'opacity-50 [&_svg]:invisible',
																	)}
																>
																	<Icons.check className="w-4 h-4" />
																</div>
																<span>{vehicleBrand.name}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* Vehicle Models */}
							<div className="space-y-2">
								<Label>
									Модел <span className="text-destructive">*</span>
								</Label>
								<Popover open={selecteVehicleModelOpen} onOpenChange={setSelecteVehicleModelOpen}>
									<PopoverTrigger asChild>
										<Button
											disabled={!selectedVehicleBrand}
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between w-full',
												errors?.vehicle_model_id && 'border-destructive',
											)}
										>
											{selectedVehicleModel
												? vehicleModels?.find(
														(vehicleModel) => vehicleModel.id === selectedVehicleModel,
												  )?.name
												: 'Избери модел'}
											<Icons.chevronUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandList>
												<CommandEmpty>No results found.</CommandEmpty>
												<CommandGroup>
													{vehicleModels?.map((vehicleModel) => {
														const isSelected = selectedVehicleModel === vehicleModel.id;
														return (
															<CommandItem
																key={vehicleModel.id}
																onSelect={() => {
																	if (errors.vehicle_model_id) {
																		delete errors.vehicle_model_id;
																	}
																	if (isSelected) setSelectedVehicleModel(null);
																	else setSelectedVehicleModel(vehicleModel.id);
																	setSelecteVehicleModelOpen(false);
																}}
															>
																<div
																	className={cn(
																		'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
																		isSelected
																			? 'bg-primary text-primary-foreground'
																			: 'opacity-50 [&_svg]:invisible',
																	)}
																>
																	<Icons.check className="w-4 h-4" />
																</div>
																<span>{vehicleModel.name}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* Vehicle Model Types */}
							<div className="space-y-2">
								<Label>
									Тип Модел <span className="text-destructive">*</span>
								</Label>
								<Popover
									open={selecteVehicleModelTypeOpen}
									onOpenChange={setSelecteVehicleModelTypeOpen}
								>
									<PopoverTrigger asChild>
										<Button
											disabled={!selectedVehicleModel}
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between w-full',
												errors?.vehicle_model_type_id && 'border-destructive',
											)}
										>
											{selectedVehicleModelType
												? vehicleModelTypes?.find(
														(vehicleModelType) =>
															vehicleModelType.id === selectedVehicleModelType,
												  )?.name
												: 'Избери модел'}
											<Icons.chevronUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandList>
												<CommandEmpty>No results found.</CommandEmpty>
												<CommandGroup>
													{vehicleModelTypes?.map((modelType) => {
														const isSelected = selectedVehicleModelType === modelType.id;
														return (
															<CommandItem
																key={modelType.id}
																onSelect={() => {
																	if (errors.vehicle_model_type_id) {
																		delete errors.vehicle_model_type_id;
																	}
																	if (isSelected) setSelectedVehicleModelType(null);
																	else setSelectedVehicleModelType(modelType.id);
																	setSelecteVehicleModelTypeOpen(false);
																}}
															>
																<div
																	className={cn(
																		'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
																		isSelected
																			? 'bg-primary text-primary-foreground'
																			: 'opacity-50 [&_svg]:invisible',
																	)}
																>
																	<Icons.check className="w-4 h-4" />
																</div>
																<span>{modelType.name}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* category */}
							<div className="space-y-2">
								<Label>
									Купе<span className="text-destructive">*</span>
								</Label>
								<Popover open={selecteVehicleCategoryOpen} onOpenChange={setSelecteVehicleCategoryOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between w-full',
												errors?.vehicle_category_id && 'border-destructive',
											)}
										>
											{selectedVehicleCategory
												? vehicleCategories?.find(
														(vehicleCategory) =>
															parseInt(vehicleCategory.id) === selectedVehicleCategory,
												  )?.value
												: 'Избери скоросттна кутия'}
											<Icons.chevronUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandList>
												<CommandEmpty>No results found.</CommandEmpty>
												<CommandGroup>
													{vehicleCategories?.map((vehicleCategory) => {
														const isSelected =
															selectedVehicleCategory === parseInt(vehicleCategory.id);
														return (
															<CommandItem
																key={vehicleCategory.id}
																onSelect={() => {
																	if (errors.vehicle_category_id) {
																		delete errors.vehicle_category_id;
																	}
																	if (isSelected) setSelectedVehicleCategory(null);
																	else
																		setSelectedVehicleCategory(
																			parseInt(vehicleCategory.id),
																		);
																	setSelecteVehicleCategoryOpen(false);
																}}
															>
																<div
																	className={cn(
																		'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
																		isSelected
																			? 'bg-primary text-primary-foreground'
																			: 'opacity-50 [&_svg]:invisible',
																	)}
																>
																	<Icons.check className="w-4 h-4" />
																</div>
																<span>{vehicleCategory.value}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* transmission Type */}
							<div className="space-y-2">
								<Label>
									Тип скоросттна кутия <span className="text-destructive">*</span>
								</Label>
								<Popover open={selecteTransmissionOpen} onOpenChange={setSelecteTransmissionOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between w-full',
												errors?.transmission_id && 'border-destructive',
											)}
										>
											{selectedTransmission
												? transmissionTypes?.find(
														(transmissionTypes) =>
															parseInt(transmissionTypes.id) === selectedTransmission,
												  )?.value
												: 'Избери скоросттна кутия'}
											<Icons.chevronUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandList>
												<CommandEmpty>No results found.</CommandEmpty>
												<CommandGroup>
													{transmissionTypes?.map((transmissionType) => {
														const isSelected =
															selectedTransmission === parseInt(transmissionType.id);
														return (
															<CommandItem
																key={transmissionType.id}
																onSelect={() => {
																	if (errors.transmission_id) {
																		delete errors.transmission_id;
																	}
																	if (isSelected) setSelectedTransmissionType(null);
																	else
																		setSelectedTransmissionType(
																			parseInt(transmissionType.id),
																		);
																	setSelecteTransmissionOpen(false);
																}}
															>
																<div
																	className={cn(
																		'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
																		isSelected
																			? 'bg-primary text-primary-foreground'
																			: 'opacity-50 [&_svg]:invisible',
																	)}
																>
																	<Icons.check className="w-4 h-4" />
																</div>
																<span>{transmissionType.value}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* colours */}
							<div className="space-y-2">
								<Label>
									Цвят <span className="text-destructive">*</span>
								</Label>
								<Popover open={selecteColorOpen} onOpenChange={setSelecteColorOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between w-full',
												errors?.color && 'border-destructive',
											)}
										>
											{selectedColor
												? colours?.find((colour) => colour.id === selectedColor)?.value
												: 'Избери цвят'}
											<Icons.chevronUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandList>
												<CommandEmpty>No results found.</CommandEmpty>
												<CommandGroup>
													{colours?.map((colour) => {
														const isSelected = selectedColor === colour.id;
														return (
															<CommandItem
																key={colour.id}
																onSelect={() => {
																	if (errors.color) {
																		delete errors.color;
																	}
																	if (isSelected) setSelectedColor(null);
																	else setSelectedColor(colour.id);
																	setSelecteColorOpen(false);
																}}
															>
																<div
																	className={cn(
																		'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
																		isSelected
																			? 'bg-primary text-primary-foreground'
																			: 'opacity-50 [&_svg]:invisible',
																	)}
																>
																	<Icons.check className="w-4 h-4" />
																</div>
																<span>{colour.value}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* Picture */}
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="picture">Picture</Label>
								<input
									id="picture"
									type="file"
									onChange={(event) => {
										const file = event.target.files![0];
										formData.append('images', file);
									}}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full gap-4">
							{/* Year Type
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-[280px] justify-start text-left font-normal',
											!date && 'text-muted-foreground',
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? format(date, 'PPP') : <span>Pick a date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
								</PopoverContent>
							</Popover> */}

							{/* Fuel Type */}
							<div className="space-y-2">
								<Label>
									Гориво <span className="text-destructive">*</span>
								</Label>
								<Popover open={selecteFuelOpen} onOpenChange={setSelecteFuelOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between w-full',
												errors?.fuel && 'border-destructive',
											)}
										>
											{selectedFuel
												? fuels?.find((fuel) => parseInt(fuel.id) === selectedFuel)?.value
												: 'Избери скоросттна кутия'}
											<Icons.chevronUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandList>
												<CommandEmpty>No results found.</CommandEmpty>
												<CommandGroup>
													{fuels?.map((fuel) => {
														const isSelected = selectedFuel === parseInt(fuel.id);
														return (
															<CommandItem
																key={fuel.id}
																onSelect={() => {
																	if (errors.fuel_id) {
																		delete errors.fuel_id;
																	}
																	if (isSelected) setSelectedFuel(null);
																	else setSelectedFuel(parseInt(fuel.id));
																	setSelecteFuelOpen(false);
																}}
															>
																<div
																	className={cn(
																		'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
																		isSelected
																			? 'bg-primary text-primary-foreground'
																			: 'opacity-50 [&_svg]:invisible',
																	)}
																>
																	<Icons.check className="w-4 h-4" />
																</div>
																<span>{fuel.value}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* Price */}
							<div className="grid gap-2">
								<Label htmlFor="price">
									Цена <span className="text-destructive">*</span>{' '}
								</Label>
								<Input
									id="price"
									type="number"
									disabled={isLoading}
									placeholder="0 лв"
									step={0}
									defaultValue={advertisment?.price}
									className={errors?.price && 'border-destructive'}
									{...formRegister('price')}
								></Input>
								{errors?.price && (
									<span className="pl-1 text-xs text-destructive">
										{errors.price.message?.toString()}
									</span>
								)}
							</div>

							{/* Мileage */}
							<div className="grid gap-2">
								<Label htmlFor="mileage">
									Пробег <span className="text-destructive">*</span>{' '}
								</Label>
								<Input
									id="mileage"
									type="number"
									disabled={isLoading}
									placeholder="0 км"
									step={0}
									defaultValue={advertisment?.mileage}
									className={errors?.mileage && 'border-destructive'}
									{...formRegister('mileage')}
								></Input>
								{errors?.mileage && (
									<span className="pl-1 text-xs text-destructive">
										{errors.mileage.message?.toString()}
									</span>
								)}
							</div>

							{/* Horse power */}
							<div className="grid gap-2">
								<Label htmlFor="mileage">
									Конски сили <span className="text-destructive">*</span>{' '}
								</Label>
								<Input
									id="horsePower"
									type="number"
									disabled={isLoading}
									placeholder="0 КС"
									step={0}
									defaultValue={advertisment?.horsePower}
									className={errors?.horse_power && 'border-destructive'}
									{...formRegister('horse_power')}
								></Input>
								{errors?.horse_power && (
									<span className="pl-1 text-xs text-destructive">
										{errors.horse_power.message?.toString()}
									</span>
								)}
							</div>

							{/* Capacity */}
							<div className="grid gap-2">
								<Label htmlFor="capacity">
									Капацитет <span className="text-destructive">*</span>{' '}
								</Label>
								<Input
									id="capacity"
									type="number"
									disabled={isLoading}
									placeholder="0"
									step={0}
									defaultValue={advertisment?.engine_capacity}
									className={errors?.engine_capacity && 'border-destructive'}
									{...formRegister('engine_capacity')}
								></Input>
								{errors?.engine_capacity && (
									<span className="pl-1 text-xs text-destructive">
										{errors.engine_capacity.message?.toString()}
									</span>
								)}
							</div>

							{/* Description */}
							<div className="grid gap-2">
								<Label htmlFor="note">
									Описнаие <span className="text-destructive">*</span>{' '}
								</Label>
								<Textarea
									id="note"
									defaultValue={advertisment?.description || undefined}
									disabled={isLoading}
									{...formRegister('description')}
								></Textarea>
								{errors?.description && (
									<span className="pl-1 text-xs text-destructive">
										{errors.description.message?.toString()}
									</span>
								)}
							</div>
						</div>
					</div>

					<Button type="submit" disabled={isDisabled} className="w-full mt-2">
						{isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
						{!advertisment ? 'Create' : 'Save'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

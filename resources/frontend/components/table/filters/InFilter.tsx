import { Table } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Separator } from '@/components/ui/Separator';
import { Icons, Icon } from '@/components/Icons';
import { MouseEvent } from 'react';

interface Option {
	icon?: Icon;
	label: string;
	secondLabel?: string;
	value: string;
	children?: Option[];
}

interface InFilter<TData> {
	table?: Table<TData>;
	title?: string;
	single?: boolean;
	withChildren?: boolean;
	options: Option[];
	selectedValues: string[];
	onSetSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}

export function InFilter<TData>({
	table,
	title,
	single,
	withChildren,
	options,
	selectedValues,
	onSetSelectedValues: setSelectedValues,
}: InFilter<TData>) {
	const availableOptions = withChildren
		? [...options, ...(options.map((option) => option.children).flat() as Option[])]
		: options;

	// Function to clear the set filter
	const handleClearFilters = (event: MouseEvent) => {
		event.stopPropagation(); // Prevent the tooltip from opening

		table?.setPageIndex(0); // Go to the first page of the table
		setSelectedValues([]); // Clear all selected filter values
	};

	// Track if filters are applied
	const areFiltersApplied = selectedValues.length > 0;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className={cn(
						'h-8 border-dashed data-[state=open]:border-solid duration-100',
						areFiltersApplied
							? 'bg-primary hover:bg-primary/95 hover:text-secondary border-0 text-secondary' // Colors when filters are applied
							: 'data-[state=open]:bg-accent data-[state=open]:border-secondary', // Default colors
					)}
				>
					<Icons.plusCircle
						className={cn(
							'w-4 h-4 mr-2 transition-all duration-500',
							areFiltersApplied && 'rotate-45 text-destructive',
						)}
						onClick={(event) => areFiltersApplied && handleClearFilters(event)}
					/>
					{title}
					{areFiltersApplied && (
						<>
							<Separator orientation="vertical" className="h-4 mx-2" />
							<Badge variant="secondary" className="px-1 font-normal rounded-sm lg:hidden">
								{selectedValues.length}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.length > 2 ? (
									<Badge variant="secondary" className="px-1 font-normal rounded-sm">
										{selectedValues.length} selected
									</Badge>
								) : (
									availableOptions
										.filter((option) => selectedValues.includes(option.value))
										.map((option) => {
											return (
												<Badge
													key={`${title}-${option.value}`}
													variant="secondary"
													className="px-1 font-normal rounded-sm"
												>
													{option.label}
												</Badge>
											);
										})
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{availableOptions.map((option) => {
							const isSelected = selectedValues.includes(option.value);

							// Option with children
							if (withChildren)
								return (
									<CommandGroup key={`${title}-${option.value}`} heading={option.label}>
										<CommandItem
											onSelect={() => {
												table?.setPageIndex(0); // Go to first page

												// Handle selection
												if (isSelected)
													setSelectedValues(selectedValues.filter((v) => v !== option.value));
												else
													setSelectedValues(
														single ? [option.value] : [...selectedValues, option.value],
													);
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
												<Icons.check className={cn('h-4 w-4')} />
											</div>
											{option.icon && (
												<option.icon className="w-4 h-4 mr-2 text-muted-foreground" />
											)}
											<span>{option.label}</span>
										</CommandItem>

										{/* Children options */}
										{option.children?.map((childOption) => {
											const isSelected = selectedValues.includes(childOption.value);
											return (
												<CommandItem
													key={`${title}-${childOption.value}`}
													onSelect={() => {
														table?.setPageIndex(0); // Go to first page

														// Handle selection
														if (isSelected)
															setSelectedValues(
																selectedValues.filter((v) => v !== childOption.value),
															);
														else
															setSelectedValues(
																single
																	? [childOption.value]
																	: [...selectedValues, childOption.value],
															);
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
														<Icons.check className={cn('h-4 w-4')} />
													</div>
													{childOption.icon && (
														<childOption.icon className="w-4 h-4 mr-2 text-muted-foreground" />
													)}
													<span>{childOption.label}</span>
												</CommandItem>
											);
										})}
									</CommandGroup>
								);
							// Option without children
							else
								return (
									<CommandItem
										key={`${title}-${option.value}`}
										onSelect={() => {
											table?.setPageIndex(0); // Go to first page

											// Handle selection
											if (isSelected)
												setSelectedValues(selectedValues.filter((v) => v !== option.value));
											else
												setSelectedValues(
													single ? [option.value] : [...selectedValues, option.value],
												);
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
											<Icons.check className={cn('h-4 w-4')} />
										</div>
										{option.icon && <option.icon className="w-4 h-4 mr-2 text-muted-foreground" />}
										<div className="flex flex-col">
											<span>{option.label}</span>
											{option.secondLabel && (
												<span className="text-xs text-muted-foreground">
													{option.secondLabel}
												</span>
											)}
										</div>
									</CommandItem>
								);
						})}
						{areFiltersApplied && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => {
											table?.setPageIndex(0); // Go to first page
											setSelectedValues([]); // Clear selection
										}}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

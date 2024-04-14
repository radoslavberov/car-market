import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Icons } from '@/components/Icons';
import { Label } from '@/components/ui/Label';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/toast.hook';
import { Textarea } from '@/components/ui/Textarea';
import { Advertisement } from '@/types';
import { createComment } from '@/data';
import { QUERY_KEY } from '@/data/constants';

// Interface for component props
interface AddCommentDialogProps {
	advertisment?: Advertisement;
	className?: string;
}

export function AddCommentDialog({ advertisment }: AddCommentDialogProps) {
	const queryClient = useQueryClient();

	// States
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// Reset form state
	const resetForm = () => {
		reset();
	};

	// Form related stuff
	const {
		register: formRegister,
		watch,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm();

	// Check if the form is disabled
	const isDisabled = isLoading || !watch('description');
	// Handle form submit.
	async function onCreate(data: string) {
		if (isLoading) return;
		setIsLoading(true);
		try {
			// Call API to add the link

			const newAdvertisement = await createComment(advertisment?.id!, data);

			// Update cached data
			queryClient.setQueriesData([QUERY_KEY.advertisement, advertisment?.id.toString()], (oldData: any) => {
				if (!oldData) return undefined;
				return {
					...oldData,
					comments: newAdvertisement.comments,
				};
			});

			// Show toast
			toast({
				title: 'Успешно',
				description: `Добавен коментар към обявата`,
				variant: 'default',
			});

			// Close dialog
			setIsLoading(false);
			setOpen(false);
		} catch (e: any) {
			// Handle validation errors
			if (e.errors) {
				for (const property of ['description']) {
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
	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) resetForm();
				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className='ml-auto' onClick={() => setOpen(true)}>
					Добави коментар
				</Button>
			</DialogTrigger>
			<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Добавяне на нов коментар</DialogTitle>
				</DialogHeader>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit((data) => {
						{
							onCreate({
								...data,
							} as unknown as string);
						}
					})}
				>
					{/* Description */}
					<div className="grid gap-2">
						<Label htmlFor="note">
							Коментар <span className="text-destructive">*</span>{' '}
						</Label>
						<Textarea id="description " disabled={isLoading} {...formRegister('description')}></Textarea>
						{errors?.description && (
							<span className="pl-1 text-xs text-destructive">
								{errors.description.message?.toString()}
							</span>
						)}
					</div>

					<Button type="submit" disabled={isDisabled} className="w-full mt-2">
						{isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
						{!advertisment ? 'Създай' : 'Save'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

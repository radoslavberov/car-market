import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/Icons';
import { deleteAdvertisment } from '@/data';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/data/constants';

import { toast } from '@/hooks/toast.hook';

interface DeleteDialogProps {
	advertismentId: number;
}

export function DeleteDialog({ advertismentId }: DeleteDialogProps) {
	const queryClient = useQueryClient();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

	async function handleDelete() {
		setIsLoading(true);
		deleteAdvertisment(advertismentId)
			.then(() => {
				queryClient.invalidateQueries([QUERY_KEY.advertisements]);
				queryClient.invalidateQueries([QUERY_KEY.userAdvertisements]);
				toast({
					title: 'Успех',
					description: 'Обявате беше изтрита успешно',
					variant: 'default',
				});
				setDeleteDialogOpen(false);
			})
			.catch((error) => {
				console.error(error);
				toast({
					title: 'Възникна грешка',
					description: 'Обявата не може да бъде изтрита. Моля, опитайте отново по-късно.',
					variant: 'destructive',
				});
				setDeleteDialogOpen(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
					{isLoading ? (
						<Icons.spinner className="w-4 h-4 animate-spin" />
					) : (
						<Icons.trash className="w-3 h-3" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Изтриване на обява</DialogTitle>
				</DialogHeader>
				<DialogDescription>
				Това действие не може да бъде отменено. Сигурни ли сте, че искате да изтриете тази обява?
				</DialogDescription>
				<div className="flex justify-end gap-2">
					<div className="flex">
						<div style={{ flex: 3 }}>
							<Button variant="secondary" onClick={() => setDeleteDialogOpen(false)} className="mr-2">
								Отказ
							</Button>
						</div>
						<div style={{ flex: 1 }}>
							<Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
								{isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
								Изтриване
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

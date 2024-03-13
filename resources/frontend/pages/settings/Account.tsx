import { useState } from 'react';
import { Separator } from '@/components/ui/Separator';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { editUser } from '@/data/auth';
import { EditUserInput } from '@/types/auth';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/toast.hook';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/auth.hook';

export function SettingsAccountPage() {
	const { user, refetch } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		setError,
		watch,
	} = useForm();

	// Watch name & email for changes
	const name = watch('name');
	const email = watch('email');

	const editUserHandler = async (data: EditUserInput) => {
		if (isLoading || !user) return;
		setIsLoading(true);
		try {
			// Edit user & show success toast
			await editUser(data);
			toast({
				title: 'Успех',
				description: 'Параметрите са променени успешно!',
				variant: 'default',
			});

			// Update user data
			refetch();
		} catch (e: any) {
			if (e?.errors?.name) {
				setError('name', {
					type: 'manual',
					message: e.errors.name,
				});
			}
			if (e?.errors?.email) {
				setError('email', {
					type: 'manual',
					message: e.errors.email,
				});
			}
			toast({
				title: 'Възникна грешка',
				description: 'Опитайте пак!',
				variant: 'destructive',
			});
		}
		setIsLoading(false);
	};

	const isFormEdited = (name !== user?.name || email !== user?.email) && name && email;

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Акаунт</h3>
				<p className="text-sm text-muted-foreground">Актуализирайте настройките на профила си.</p>
			</div>
			<Separator />
			<form className="grid gap-4" onSubmit={handleSubmit((data) => editUserHandler(data as EditUserInput))}>
				<div className="grid gap-2">
					<Label htmlFor="name">Име</Label>
					<Input
						type="text"
						id="name"
						disabled={isLoading}
						defaultValue={user?.name}
						{...formRegister('name', {
							required: 'The name field is required.',
						})}
						className={errors?.name && 'border-red-500'}
					/>
					{errors?.name && (
						<span className="pl-1 text-xs text-red-500">{errors.name.message?.toString()}</span>
					)}
				</div>
				<div className="grid gap-2">
					<Label htmlFor="email">Имейл</Label>
					<Input
						type="email"
						id="email"
						disabled={isLoading}
						defaultValue={user?.email}
						{...formRegister('email', {
							required: 'The email field is required.',
						})}
						className={errors?.email && 'border-red-500'}
					/>
					{errors?.email && (
						<span className="pl-1 text-xs text-red-500">{errors.email.message?.toString()}</span>
					)}
				</div>
				<Button type="submit" disabled={isLoading || !isFormEdited} className="w-full">
					{isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
					Запазване
				</Button>
			</form>
		</div>
	);
}

import { Separator } from '@/components/ui/Separator';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { changePassword } from '@/data/auth';
import { useForm } from 'react-hook-form';
import { ChangePasswordInput } from '@/types/auth';
import { toast } from '@/hooks/toast.hook';
import { Icons } from '@/components/Icons';
import { Label } from '@/components/ui/Label';

export function SettingsPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const changePasswordHandler = async (data: ChangePasswordInput) => {
		if (isLoading) return;
		setIsLoading(true);
		try {

			// Change password & show success toast
			await changePassword(data);
			toast({
				title: 'Успех',
				description: 'Паролата е променена!',
				variant: 'default',
			});
		} catch (e: any) {
			if (e?.errors?.old_password) {
				setError('old_password', {
					type: 'manual',
					message: e.errors.old_password,
				});
			}
			if (e?.errors?.password) {
				setError('password', {
					type: 'manual',
					message: e.errors.password,
				});
			}
			if (e?.errors?.password_confirmation) {
				setError('password_confirmation', {
					type: 'manual',
					message: e.errors.password_confirmation,
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

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Парола</h3>
				<p className="text-sm text-muted-foreground">Актуализирайте паролата си.</p>
			</div>
			<Separator />
			<form
				className="grid gap-4"
				onSubmit={handleSubmit((data) => changePasswordHandler(data as ChangePasswordInput))}
			>
				<div className="grid gap-2">
					<Label htmlFor="old_password">Текуща парола</Label>
					<Input
						id="old_password"
						type="password"
						placeholder="Въведете текущата парола"
						disabled={isLoading}
						{...formRegister('old_password', { required: 'The current password field is required.' })}
						className={errors?.old_password && 'border-red-500'}
					/>
					{errors?.old_password && (
						<span className="pl-1 text-xs text-red-500">{errors.old_password.message?.toString()}</span>
					)}
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Нова парола</Label>
					<Input
						id="password"
						type="password"
						placeholder="Въведете нова парола"
						disabled={isLoading}
						{...formRegister('password', { required: 'The password field is required.' })}
						className={errors?.password && 'border-red-500'}
					/>
					{errors?.password && (
						<span className="pl-1 text-xs text-red-500">{errors.password.message?.toString()}</span>
					)}
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password_confirmation">Потвърждаване на новата парола</Label>
					<Input
						id="password_confirmation"
						type="password"
						placeholder="Потвърждаване на новата парола"
						disabled={isLoading}
						{...formRegister('password_confirmation', {
							required: 'The password confirmation field is required.',
						})}
						className={errors?.password_confirmation && 'border-red-500'}
					/>
					{errors?.password_confirmation && (
						<span className="pl-1 text-xs text-red-500">
							{errors.password_confirmation.message?.toString()}
						</span>
					)}
				</div>
				<Button disabled={isLoading} className="w-full">
					{isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
					Запазване
				</Button>
			</form>
		</div>
	);
}

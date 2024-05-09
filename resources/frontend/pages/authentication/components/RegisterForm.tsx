import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterInput } from '@/types/auth';
import { register } from '@/data/auth';
import { QUERY_KEY } from '@/data/constants';
import { useQueryClient } from '@tanstack/react-query';
import storage from '@/lib/storage';
import { Checkbox } from '@/components/ui/Checkbox';

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm();

	// States
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [terms, setTerms] = React.useState<boolean>(false);

	async function onSubmit(data: RegisterInput) {
		if (!terms) {
			setError('terms', { type: 'manual', message: 'Полето е задължително.' });
			return; // Prevent form submission if terms are not checked
		}
		clearErrors('terms'); // Clear any previous errors for 'terms'

		if (isLoading) return;
		setIsLoading(true);
		try {
			// Register user & save token in local storage
			const registerData = await register({ ...data, terms: terms });
			queryClient.setQueryData([QUERY_KEY.auth], registerData);
			registerData.token && storage.saveToken(registerData.token);

			setIsLoading(false);
			navigate('/dashboard', { replace: true });
		} catch (e: any) {
			if (e?.errors?.name)
				setError('name', {
					type: 'manual',
					message: e.errors.name,
				});
			if (e?.errors?.email)
				setError('email', {
					type: 'manual',
					message: e.errors.email,
				});
			if (e?.errors?.password)
				setError('password', {
					type: 'manual',
					message: e.errors.password,
				});
            if (e?.errors?.phone_number)
                setError('phone_number', {
                    type: 'manual',
                    message: e.errors.phone_number,
                });
			setIsLoading(false);
		}
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit((data) => onSubmit(data as RegisterInput))}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="name">
							Name
						</Label>
						<Input
							id="name"
							{...formRegister('name', { required: 'Полето за име е задължително.' })}
							placeholder="Иван Иванов"
							type="text"
							autoCapitalize="none"
							autoComplete="name"
							autoCorrect="off"
							disabled={isLoading}
							className={errors?.name && 'border-red-500'}
						/>
						{errors?.name && (
							<span className="pl-1 text-xs text-red-500">{errors.name.message?.toString()}</span>
						)}
					</div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							{...formRegister('email', { required: 'Полето за имейл е задължително.' })}
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							className={errors?.email && 'border-red-500'}
						/>
						{errors?.email && (
							<span className="pl-1 text-xs text-red-500">{errors.email.message?.toString()}</span>
						)}
					</div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="phone_number">
                            Phone number
                        </Label>
                        <Input
                            id="email"
                            {...formRegister('phone_number', { required: 'Полето за телефонен номер e задължително.' })}
                            placeholder="Телефонен номер"
                            type="phone_number"
                            autoCapitalize="none"
                            autoComplete="phone_number"
                            autoCorrect="off"
                            disabled={isLoading}
                            className={errors?.phone_number && 'border-red-500'}
                        />
                        {errors?.phone_number && (
                            <span className="pl-1 text-xs text-red-500">{errors.phone_number.message?.toString()}</span>
                        )}
                    </div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							{...formRegister('password', { required: 'Полето за парола е задължително.' })}
							placeholder="Парола"
							type="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
							className={errors?.password && 'border-red-500'}
						/>
						{errors?.password && (
							<span className="pl-1 text-xs text-red-500">{errors.password.message?.toString()}</span>
						)}
					</div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="password_confirmation">
							Password Confirmation
						</Label>
						<Input
							id="password_confirmation"
							{...formRegister('password_confirmation', {
								required: 'Полето за потвърждение на паролата e задължително.',
							})}
							placeholder="Потвърди парола"
							type="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
							className={errors?.password_confirmation && 'border-red-500'}
						/>
						{errors?.password_confirmation && (
							<span className="pl-1 text-xs text-red-500">
								{errors.password_confirmation.message?.toString()}
							</span>
						)}
					</div>
					<div className="grid gap-1">
						<div className="flex flex-row items-center gap-1 my-1">
							<Checkbox
								id="terms"
								{...formRegister('terms', {
									required: 'Моля, приемете условията на използване.',
								})}
								checked={terms}
								onCheckedChange={(checked) => setTerms(checked === 'indeterminate' ? false : checked)}
							/>
							<div>
								<Label htmlFor="terms" className="flex-1 text-xs">
									Приемам{' '}
									<a
										href="/terms-and-conditions"
										target="_blank"
										className="text-blue-600 hover:underline hover:text-blue-800"
									>
										условията на използване
									</a>
								</Label>
								<span className="ml-1 text-red-500 truncate cursor-default">*</span>
							</div>
						</div>
						{errors?.terms && (
							<span className="pl-1 text-xs text-red-500">{errors.terms.message?.toString()}</span>
						)}
					</div>
					<Button disabled={isLoading} className="mt-2">
						{isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
						Регистрация
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="px-2 bg-background text-muted-foreground">Вече имате акаунт?</span>
				</div>
			</div>
			<Link to="/login" className={buttonVariants({ variant: 'outline' })}>
				<Icons.user className="w-4 h-4 mr-2" />
				Вход
			</Link>
		</div>
	);
}

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { LoginInput } from '@/types/auth';
import { login } from '@/data/auth';
import { QUERY_KEY } from '@/data/constants';
import storage from '@/lib/storage';
import { toast } from '@/hooks/toast.hook';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(data: LoginInput) {
		if (isLoading) return;
		setIsLoading(true);
		try {
			// Login user & save token in local storage
			const loginData = await login(data);
			queryClient.setQueryData([QUERY_KEY.auth], loginData);
			loginData.token && storage.saveToken(loginData.token);

			setIsLoading(false);
			navigate('/dashboard', { replace: true });
		} catch (e: any) {
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

			toast({
				title: 'Възникна грешка',
				description: 'Въведете правилни данни и опитайте пак!',
				variant: 'destructive',
			});

			setIsLoading(false);
			console.error(e);
		}
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit((data) => onSubmit(data as LoginInput))}>
				<div className="grid gap-2">
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
					<Button disabled={isLoading} className="mt-2">
						{isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
						Вход
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="px-2 bg-background text-muted-foreground">Нямате акаунт?</span>
				</div>
			</div>
			<Link to="/register" className={buttonVariants({ variant: 'outline' })}>
				<Icons.user className="w-4 h-4 mr-2" />
				Регистрирайте се
			</Link>
		</div>
	);
}

import { MainNavigation } from '@/components/MainNavigation';
import { UserNavigation } from '@/components/UserNavigation';
import { ModeToggle } from '@/components/ModeToggle';
// import { TopUpButton } from '@/components/TopUpButton';
import { MobileNavigation } from '@/components/MobileNavigation';
// import { CommandMenu } from '@/components/CommandMenu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { useAuth } from '@/hooks/auth.hook';
import { cn } from '@/lib/utils';

export function AppHeader() {
	const { user } = useAuth();

	return (
		<header className="border-b bg-background">
			<div className="flex items-center h-16 px-4">
				<MainNavigation className="mx-6" />
				<MobileNavigation />
				<div className="flex items-center justify-between flex-1 space-x-2 md:justify-end">

					{user
                        &&
                        (
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex flex-col text-sm leading-4 cursor-default">
									<span className="font-semibold">Месечен лимит</span>
									<span
										className={cn(
											user.monthlyAdvertisementsDone == user.advertisementsLimit ? 'text-destructive' : 'text-brand',
										)}
									>
										{user.monthlyAdvertisementsDone} / {user.advertisementsLimit} обяви
									</span>
								</div>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="flex flex-col max-w-xl">
								<span>Вашият месечен лимит за обяви.</span>
								<span>
									Ако достигнете този лимит, ще трябва да изчакате до следващия месец, за да направите
									нов!
								</span>
							</TooltipContent>
						</Tooltip>
					)
                    }

					{/* Searchbar */}
					{/* <div className="flex-1 hidden w-full sm:inline md:w-auto md:flex-none">
						<CommandMenu />
					</div> */}

					{/* Header right-side items */}
					<nav className="flex items-center space-x-2">
						<UserNavigation />
						<ModeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}

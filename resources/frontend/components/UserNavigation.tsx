import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	// DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useAuth, useLogout } from '@/hooks/auth.hook';

function containsWhitespace(value: string) {
	return /\s/.test(value);
}

export function UserNavigation() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const logout = useLogout();
	let userInitials = user?.name.charAt(0);

	// Split the name if possible & set user initials
	if (user?.name && containsWhitespace(user.name)) {
		const spaceIndex: number = user.name.indexOf(' ');
		if (spaceIndex !== -1 && spaceIndex + 1 < user.name.length) {
			const letterToAdd: string = user.name.charAt(spaceIndex + 1);
			userInitials += letterToAdd;
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative w-8 h-8 rounded-full">
					<Avatar className="w-8 h-8">
						{/*<AvatarImage src="./" alt="@analizirai.com" />*/}
						<AvatarFallback>{userInitials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user?.name}</p>
						<p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => navigate('/settings/account')}>
						<User className="w-4 h-4 mr-2" />
						<span>Акаунт</span>
						{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
					</DropdownMenuItem>
					{/* <DropdownMenuItem>
						<CreditCard className="w-4 h-4 mr-2" />
						<span>Billing</span>
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem> */}
					<DropdownMenuItem onClick={() => navigate('/settings/account')}>
						<Settings className="w-4 h-4 mr-2" />
						<span>Настройки</span>
						{/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
					</DropdownMenuItem>
					{/* <DropdownMenuItem>
						<PlusCircle className="w-4 h-4 mr-2" />
						<span>New Team</span>
					</DropdownMenuItem> */}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout}>
					<LogOut className="w-4 h-4 mr-2" />
					<span>Излизане</span>
					{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

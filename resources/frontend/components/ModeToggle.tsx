import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Icons } from '@/components/Icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import useDarkMode from '@/hooks/darkMode.hook';

export function ModeToggle() {
  const { enable, disable, useSystemPreference } = useDarkMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-0 w-9">
          <Icons.sun className="transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
          <Icons.moon className="absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => disable()}>
          <Icons.sun className="w-4 h-4 mr-2" />
          <span>Светла</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => enable()}>
          <Icons.moon className="w-4 h-4 mr-2" />
          <span>Тъмна</span>
        </DropdownMenuItem>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuItem onClick={() => useSystemPreference()}>
              <Icons.laptop className="w-4 h-4 mr-2" />
              <span>Системна</span>
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <span>Използвай системна преференция</span>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

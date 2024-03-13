'use client';

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogProps } from '@radix-ui/react-dialog';
import { File, Laptop, Moon, SunMedium } from 'lucide-react';
import useDarkMode from '@/hooks/darkMode.hook';

import { navConfig } from '@/config/nav';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command';
import { siteConfig } from '@/config/site';
import { Icons } from './Icons';

export function CommandMenu({ ...props }: DialogProps) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const {
    enable: enableDarkMode,
    disable: disableDarkMode,
    useSystemPreference,
  } = useDarkMode();

  // Open the command menu when the user presses Cmd/Ctrl + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Close the command menu when the user does something
  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-10 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">
          Търси в {siteConfig.name}...
        </span>
        <span className="inline-flex lg:hidden">Търси...</span>
        {/* <kbd className="pointer-events-none absolute right-1.5 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd> */}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Търси по..." />
        <CommandList>
          <CommandEmpty>Няма намерени резултати.</CommandEmpty>
          <CommandGroup heading="Линкове">
            {navConfig.mainNav
              .filter((navitem) => !navitem.external)
              .map((navItem) => {
                const Icon = Icons[navItem.icon as keyof typeof Icons] || File;
                return (
                  <CommandItem
                    key={navItem.to}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() => navigate(navItem.to as string));
                    }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {navItem.title}
                  </CommandItem>
                );
              })}
          </CommandGroup>
          {/* {navConfig.sidebarNav.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => navigate(navItem.href as string))
                  }}
                >
                  <div className="flex items-center justify-center w-4 h-4 mr-2">
                    <Circle className="w-3 h-3" />
                  </div>
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))} */}
          <CommandSeparator />
          <CommandGroup heading="Тема">
            <CommandItem onSelect={() => runCommand(() => disableDarkMode())}>
              <SunMedium className="w-4 h-4 mr-2" />
              Светла
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => enableDarkMode())}>
              <Moon className="w-4 h-4 mr-2" />
              Тъмна
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => useSystemPreference())}
            >
              <Laptop className="w-4 h-4 mr-2" />
              Системна
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

'use client';

import { Bell, Home, LineChart, Loader2, Package, Package2, Search, ShoppingCart, Users, Wifi, WifiOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useGeo } from '@/context/geo-provider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function AppHeader() {
  const { status } = useGeo();

  const getStatusIcon = () => {
    switch (status) {
      case 'syncing':
        return {
          Icon: Loader2,
          className: 'animate-spin text-blue-500',
          tooltip: 'Syncing offline data...',
        };
      case 'offline':
        return {
          Icon: WifiOff,
          className: 'text-red-500',
          tooltip: 'Offline. Actions are being queued.',
        };
      case 'error':
         return {
          Icon: WifiOff,
          className: 'text-red-500',
          tooltip: 'Syncing error. Please check connection.',
        };
      default:
        return {
          Icon: Wifi,
          className: 'text-green-500',
          tooltip: 'Online and synced.',
        };
    }
  };

  const { Icon, className, tooltip } = getStatusIcon();


  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="h-6 w-6" />
      <div className="w-full flex-1">
        <h1 className="font-headline text-lg font-semibold">Super Admin Dashboard</h1>
      </div>

       <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon className={className} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src="https://picsum.photos/seed/superadmin/100/100"
                alt="Super Admin"
                data-ai-hint="person portrait"
              />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Super Admin</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

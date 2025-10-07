'use client';

import {
  Bell,
  Home,
  Languages,
  LineChart,
  Loader2,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Wifi,
  WifiOff,
} from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { PushNotificationManager } from '@/components/notifications/PushNotificationManager';
import { useI18n } from '@/context/i18n-provider';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '../../../i18n.config';

export function AppHeader() {
  const { status } = useGeo();
  const { dict, lang } = useI18n();
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleLanguageChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    router.push(redirectedPathName(locale));
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'syncing':
        return {
          Icon: Loader2,
          className: 'animate-spin text-blue-500',
          tooltip: dict.status_syncing,
        };
      case 'offline':
        return {
          Icon: WifiOff,
          className: 'text-red-500',
          tooltip: dict.status_offline,
        };
      case 'error':
        return {
          Icon: WifiOff,
          className: 'text-red-500',
          tooltip: dict.status_error,
        };
      default:
        return {
          Icon: Wifi,
          className: 'text-green-500',
          tooltip: dict.status_online,
        };
    }
  };

  const { Icon, className, tooltip } = getStatusIcon();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="h-6 w-6" />
      <div className="w-full flex-1">
        <h1 className="font-headline text-lg font-semibold">{dict.header_title}</h1>
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
          <Button variant="ghost" size="icon">
            <Languages />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{dict.language}</DropdownMenuLabel>
          {i18n.locales.map(locale => (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              disabled={lang === locale}
            >
              {locale === 'en' ? 'English' : 'اردو'}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <PushNotificationManager />

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
          <DropdownMenuLabel>{dict.user_menu_super_admin}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{dict.user_menu_settings}</DropdownMenuItem>
          <DropdownMenuItem>{dict.user_menu_support}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{dict.user_menu_logout}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

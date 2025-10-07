import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  Package,
  Gavel,
  AreaChart,
  Settings,
  Shield,
  User,
  Truck,
  BookUser,
  Wallet,
  FileClock,
} from 'lucide-react';
import { PharmaFlowLogo } from '@/components/icons';

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <PharmaFlowLogo className="w-8 h-8 text-primary" />
          <span className="font-headline text-xl font-semibold text-primary">
            PharmaFlow
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" passHref>
              <SidebarMenuButton tooltip="Dashboard">
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/admin" passHref>
              <SidebarMenuButton tooltip="Super Admin">
                <Shield />
                <span>Super Admin</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/manager" passHref>
              <SidebarMenuButton tooltip="Manager">
                <Gavel />
                <span>Manager</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/customer" passHref>
              <SidebarMenuButton tooltip="Customer">
                <User />
                <span>Customer</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/booker" passHref>
              <SidebarMenuButton tooltip="Booker">
                <BookUser />
                <span>Booker</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/delivery" passHref>
              <SidebarMenuButton tooltip="Delivery">
                <Truck />
                <span>Delivery</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/accounts" passHref>
              <SidebarMenuButton tooltip="Accounts">
                <Wallet />
                <span>Accounts</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/audits" passHref>
              <SidebarMenuButton tooltip="Audit History">
                <FileClock />
                <span>Audit History</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics">
              <AreaChart />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

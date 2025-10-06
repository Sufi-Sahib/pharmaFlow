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
  BookUser,
  Truck,
  User,
  Wallet,
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
            <Link href="/" passHref legacyBehavior>
              <SidebarMenuButton tooltip="Dashboard" asChild>
                <a>
                  <Home />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/booker" passHref legacyBehavior>
              <SidebarMenuButton tooltip="Booker" asChild>
                <a>
                  <BookUser />
                  <span>Booker</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/delivery" passHref legacyBehavior>
              <SidebarMenuButton tooltip="Delivery" asChild>
                <a>
                  <Truck />
                  <span>Delivery</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/customer" passHref legacyBehavior>
              <SidebarMenuButton tooltip="Customer" asChild>
                <a>
                  <User />
                  <span>Customer</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/accounts" passHref legacyBehavior>
              <SidebarMenuButton tooltip="Accounts" asChild>
                <a>
                  <Wallet />
                  <span>Accounts</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Distributors">
              <Users />
              <span>Distributors</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Packages">
              <Package />
              <span>Packages</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Policies">
              <Gavel />
              <span>Policies</span>
            </SidebarMenuButton>
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

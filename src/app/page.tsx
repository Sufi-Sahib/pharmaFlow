import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ActiveDeliveries } from "@/components/dashboard/active-deliveries";
import { BiddingOverview } from "@/components/dashboard/bidding-overview";
import { DistributorRequests } from "@/components/dashboard/distributor-requests";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6 space-y-6">
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DistributorRequests />
            </div>
            <div className="lg:col-span-1">
              <BiddingOverview />
            </div>
          </div>
          <ActiveDeliveries />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function AccountsDashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Total revenue overview.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$1,250,432.00</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Pending Payments</CardTitle>
          <CardDescription>Invoices awaiting payment.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$78,210.50</p>
        </CardContent>
      </Card>
       <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A log of recent financial activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A table of recent transactions will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}


export default function AccountsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4 font-headline">Accounts Dashboard</h1>
          <AccountsDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

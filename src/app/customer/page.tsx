import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Track Your Order</CardTitle>
          <CardDescription>Current status of your delivery.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-semibold">Order #12345 - On the way</p>
            <Progress value={75} />
            <p className="text-sm text-muted-foreground">Estimated delivery: Today, 5:00 PM</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Your past orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A list of your previous orders will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}


export default function CustomerPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4 font-headline">Customer Dashboard</h1>
          <CustomerDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

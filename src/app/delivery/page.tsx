import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function DeliveryDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assigned Deliveries</CardTitle>
          <CardDescription>Your current delivery tasks.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #12345</p>
                <p className="text-sm text-muted-foreground">123 Main St, Anytown USA</p>
              </div>
              <Badge>In Progress</Badge>
           </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Delivery History</CardTitle>
          <CardDescription>Your completed deliveries.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A list of past deliveries will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DeliveryPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4 font-headline">Delivery Dashboard</h1>
          <DeliveryDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

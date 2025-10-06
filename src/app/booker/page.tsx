import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function BookerDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book a Delivery</CardTitle>
          <CardDescription>Schedule a new delivery.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Form to book a new delivery will go here.</p>
          <Button className="mt-4">Book Now</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deliveries</CardTitle>
          <CardDescription>Your scheduled deliveries.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A list of upcoming deliveries will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BookerPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4 font-headline">Booker Dashboard</h1>
          <BookerDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

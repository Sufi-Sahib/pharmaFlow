
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { distributors } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

function DistributorCard({ distributor }: { distributor: (typeof distributors)[0] }) {
  const statusColors: { [key: string]: string } = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Suspended: "bg-orange-100 text-orange-800"
  };

  const commission = distributor.currentSales * 0.05;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{distributor.companyName}</CardTitle>
                <CardDescription>Package: {distributor.package}</CardDescription>
            </div>
            <Badge className={statusColors[distributor.status]}>{distributor.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Bookers</span>
                    <span>{distributor.bookers.current} / {distributor.bookers.max}</span>
                </div>
                <Progress value={(distributor.bookers.current / distributor.bookers.max) * 100} />
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Delivery Staff</span>
                    <span>{distributor.deliveryStaff.current} / {distributor.deliveryStaff.max}</span>
                </div>
                <Progress value={(distributor.deliveryStaff.current / distributor.deliveryStaff.max) * 100} />
            </div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Monthly Performance</h4>
            <div className="flex justify-between text-sm">
                <span>Current Sales</span>
                <span>${distributor.currentSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mt-1 text-red-600 font-medium">
                <span>Commission Charge</span>
                <span>${commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {distributor.status === "Pending" && <Button size="sm" className="w-full">Approve</Button>}
        {distributor.status === "Approved" && <Button size="sm" variant="destructive" className="w-full">Suspend</Button>}
        {distributor.status === "Suspended" && <Button size="sm" className="w-full">Re-activate</Button>}
        <Button size="sm" variant="outline" className="w-full">Change Package</Button>
      </CardFooter>
    </Card>
  )
}

function SuperAdminDashboard() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Distributor Management</h1>
            <p className="text-muted-foreground">Manage all distributor accounts on the platform.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {distributors.map(distributor => (
            <DistributorCard key={distributor.id} distributor={distributor} />
        ))}
        </div>
    </div>
  );
}


export default function AdminPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <SuperAdminDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

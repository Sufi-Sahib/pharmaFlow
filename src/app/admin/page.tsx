import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { distributors } from "@/lib/data";

function AdminUserCard({ distributor }: { distributor: (typeof distributors)[0] }) {
  const statusColors = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <Image src={distributor.logoUrl} alt={distributor.companyName} width={48} height={48} className="rounded-lg" data-ai-hint="company logo" />
        <div>
          <CardTitle>{distributor.companyName}</CardTitle>
          <CardDescription>Joined: {distributor.joinedDate}</CardDescription>
        </div>
        <Badge className={`ml-auto ${statusColors[distributor.status]}`}>{distributor.status}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">Package: <Badge variant="secondary">{distributor.package}</Badge></p>
      </CardContent>
      <CardFooter className="gap-2">
        {distributor.status === "Pending" && <Button size="sm" className="w-full">Approve</Button>}
        {distributor.status === "Approved" && <Button size="sm" variant="destructive" className="w-full">Suspend</Button>}
        {distributor.status === "Rejected" && <Button size="sm" className="w-full">Re-activate</Button>}
        <Button size="sm" variant="outline" className="w-full">Change Package</Button>
      </CardFooter>
    </Card>
  )
}


function SuperAdminDashboard() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {distributors.map(distributor => (
        <AdminUserCard key={distributor.id} distributor={distributor} />
      ))}
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
          <h1 className="text-2xl font-bold mb-4 font-headline">Super Admin Dashboard</h1>
          <SuperAdminDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

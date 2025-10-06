
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BiddingOverview } from "@/components/dashboard/bidding-overview";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, FileText, UserPlus, PackagePlus, AlertTriangle, Users, BarChart, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const summaryCards = [
    { title: "Total Orders", value: "1,289" },
    { title: "Total Sales", value: "PKR 15,248,050" },
    { title: "Payments Received", value: "PKR 14,198,000" },
]

const recentOrders = [
    { id: "ORD-9872", customer: "City Clinic", date: "2023-10-22", total: 45000.00, orderStatus: "Delivered", paymentStatus: "Paid" },
    { id: "ORD-9871", customer: "Wellness Pharmacy", date: "2023-10-21", total: 125000.00, orderStatus: "Shipped", paymentStatus: "Pending" },
    { id: "ORD-9870", customer: "HealthFirst Meds", date: "2023-10-20", total: 8550.00, orderStatus: "Delivered", paymentStatus: "Paid" },
    { id: "ORD-9869", customer: "City Clinic", date: "2023-10-19", total: 30000.00, orderStatus: "Processing", paymentStatus: "Overdue" },
]

const salesReturns = [
    { id: "RTN-051", customer: "City Clinic", date: "2023-10-23", amount: 15000.00, status: "Pending" },
    { id: "RTN-050", customer: "Wellness Pharmacy", date: "2023-10-21", amount: 7550.00, status: "Approved" },
];

const salesTeam = [
  { name: "Ali Khan", target: 1500000, achieved: 1250000 },
  { name: "Fatima Ahmed", target: 2000000, achieved: 2150000 },
];

const statusColors: { [key: string]: string } = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Overdue: "bg-red-100 text-red-800",
    Delivered: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Processing: "bg-gray-100 text-gray-800",
    Approved: "bg-green-100 text-green-800",
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map(card => (
            <Card key={card.title}>
                <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{card.value}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <BiddingOverview />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-lg">
              <div className="flex items-center">
                <AlertTriangle className="mr-3" />
                <div>
                  <p className="font-bold">Near-Expiry Stock</p>
                  <p className="text-sm">Panadol 500mg (Batch #P2301) expiring in 15 days.</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg">
              <div className="flex items-center">
                <AlertCircle className="mr-3" />
                <div>
                  <p className="font-bold">Low Stock Warning</p>
                  <p className="text-sm">'Metformin 500mg' has only 50 units left.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Return Requests</CardTitle>
              <CardDescription>Approve or reject customer return requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Return ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReturns.map(r => (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.customer}</TableCell>
                      <TableCell>PKR {r.amount.toFixed(2)}</TableCell>
                      <TableCell><Badge className={statusColors[r.status]}>{r.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        {r.status === 'Pending' && <Button size="sm">Approve</Button>}
                        {r.status === 'Approved' && <span className="text-green-600 font-semibold flex items-center justify-end"><CheckCircle2 className="mr-1 h-4 w-4" /> Done</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sales Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {salesTeam.map(member => (
              <div key={member.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{member.name}</span>
                  <span className="text-sm text-muted-foreground">PKR {member.achieved.toLocaleString()} / PKR {member.target.toLocaleString()}</span>
                </div>
                 <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(member.achieved / member.target) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

export default function ManagerPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
            <AdminDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

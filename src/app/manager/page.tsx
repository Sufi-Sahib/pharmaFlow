
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BiddingOverview } from "@/components/dashboard/bidding-overview";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, FileText, UserPlus, PackagePlus, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const summaryCards = [
    { title: "Total Orders", value: "1,289" },
    { title: "Total Sales", value: "$152,480.50" },
    { title: "Payments Received", value: "$141,980.00" },
]

const recentOrders = [
    { id: "ORD-9872", customer: "City Clinic", date: "2023-10-22", total: 450.00, orderStatus: "Delivered", paymentStatus: "Paid" },
    { id: "ORD-9871", customer: "Wellness Pharmacy", date: "2023-10-21", total: 1250.00, orderStatus: "Shipped", paymentStatus: "Pending" },
    { id: "ORD-9870", customer: "HealthFirst Meds", date: "2023-10-20", total: 85.50, orderStatus: "Delivered", paymentStatus: "Paid" },
    { id: "ORD-9869", customer: "City Clinic", date: "2023-10-19", total: 300.00, orderStatus: "Processing", paymentStatus: "Overdue" },
]

const auditLogs = [
    { text: "Order ORD-9871 status changed to Shipped.", timestamp: "2 hours ago" },
    { text: "Customer 'Wellness Pharmacy' approved.", timestamp: "1 day ago" },
    { text: "Bid for Amlodipine 5mg from City Clinic rejected.", timestamp: "2 days ago" },
]

const statusColors: { [key: string]: string } = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Overdue: "bg-red-100 text-red-800",
    Delivered: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Processing: "bg-gray-100 text-gray-800",
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
        <BiddingOverview />

        <div className="grid gap-4 md:grid-cols-3">
            {summaryCards.map(card => (
                <Card key={card.title}>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{card.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto"><UserPlus className="mr-2" /> Add Booker</Button>
                <Button className="w-full sm:w-auto"><PackagePlus className="mr-2" /> Approve Customer</Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span tabIndex={0} className="w-full sm:w-auto">
                                <Button disabled className="w-full sm:w-auto"><AlertCircle className="mr-2" /> Add Delivery Staff</Button>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delivery Staff limit reached for your current package.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                 <div className="flex-grow flex items-center justify-end text-sm text-red-500 font-medium">
                    <AlertTriangle className="mr-2 h-5 w-5"/> Booker Limit Reached
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Input placeholder="Search orders..." className="flex-grow"/>
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Order Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Payment Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">Clear Filters</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Payment Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentOrders.map(order => (
                             <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell><Badge className={statusColors[order.orderStatus]}>{order.orderStatus}</Badge></TableCell>
                                <TableCell><Badge className={statusColors[order.paymentStatus]}>{order.paymentStatus}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Alerts</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-lg">
                        <div className="flex items-center">
                            <AlertCircle className="mr-3"/>
                            <div>
                                <p className="font-bold">Overdue Payment</p>
                                <p className="text-sm">Invoice #INV-5678 for City Clinic is 15 days overdue.</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg">
                        <div className="flex items-center">
                            <AlertTriangle className="mr-3"/>
                            <div>
                                <p className="font-bold">Stock Issue</p>
                                <p className="text-sm">Low stock for 'Metformin 500mg'. Only 50 units left.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Audit Logs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {auditLogs.map((log, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm">
                            <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
                            <div className="flex-grow">
                                <p>{log.text}</p>
                                <p className="text-xs text-muted-foreground">{log.timestamp}</p>
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

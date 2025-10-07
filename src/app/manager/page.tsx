
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BiddingOverview } from "@/components/dashboard/bidding-overview";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, FileText, UserPlus, PackagePlus, AlertTriangle, Users, BarChart, CheckCircle2, ChevronDown } from "lucide-react";
import { salesReturns, salesTeam, invoices as mockInvoices } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const summaryData = {
    totalOrders: { title: "Total Orders", value: "1,289" },
    totalSales: { title: "Total Sales", value: "PKR 35,248,050" },
    paymentsReceived: { title: "Payments Received", value: "PKR 24,198,000" },
}

const statusColors: { [key: string]: string } = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Overdue: "bg-red-100 text-red-800",
    Delivered: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Processing: "bg-gray-100 text-gray-800",
    Approved: "bg-green-100 text-green-800",
    "Due in 15 days": "bg-yellow-100 text-yellow-800",
    "Overdue by 34 days": "bg-red-100 text-red-800",
}

function OrdersDetailView() {
    return (
        <Tabs defaultValue="area">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="area">By Area</TabsTrigger>
                <TabsTrigger value="customer">By Customer</TabsTrigger>
                <TabsTrigger value="booker">By Booker</TabsTrigger>
            </TabsList>
            <TabsContent value="area">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Area</TableHead>
                            <TableHead className="text-right">Orders</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Faisalabad</TableCell>
                            <TableCell className="text-right">589</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Lahore</TableCell>
                            <TableCell className="text-right">412</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Gojra</TableCell>
                            <TableCell className="text-right">288</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="customer">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-right">Orders</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Ali Clinic</TableCell>
                            <TableCell className="text-right">102</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>National Hospital</TableCell>
                            <TableCell className="text-right">88</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabsContent>
             <TabsContent value="booker">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booker</TableHead>
                            <TableHead className="text-right">Orders</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Ali Khan</TableCell>
                            <TableCell className="text-right">700</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Fatima Ahmed</TableCell>
                            <TableCell className="text-right">589</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
    )
}

function InvoicesDetailView() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockInvoices.map(invoice => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>Customer {invoice.id.slice(-1)}</TableCell>
                        <TableCell><Badge className={statusColors[invoice.status]}>{invoice.status}</Badge></TableCell>
                        <TableCell className="text-right">PKR {invoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


function AdminDashboard() {
    const [openCard, setOpenCard] = useState<string | null>(null);
    const handleCardToggle = (cardTitle: string) => {
        setOpenCard(current => current === cardTitle ? null : cardTitle);
    }
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
        <Collapsible open={openCard === summaryData.totalOrders.title} onOpenChange={() => handleCardToggle(summaryData.totalOrders.title)}>
            <Card>
                <CollapsibleTrigger asChild>
                     <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
                        <div>
                            <CardTitle className="text-sm font-medium">{summaryData.totalOrders.title}</CardTitle>
                             <p className="text-2xl font-bold">{summaryData.totalOrders.value}</p>
                        </div>
                        <ChevronDown className={cn("h-5 w-5 transition-transform", openCard === summaryData.totalOrders.title && "rotate-180")} />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent>
                       <OrdersDetailView />
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
        
        <Collapsible open={openCard === summaryData.totalSales.title} onOpenChange={() => handleCardToggle(summaryData.totalSales.title)}>
            <Card>
                <CollapsibleTrigger asChild>
                     <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
                        <div>
                            <CardTitle className="text-sm font-medium">{summaryData.totalSales.title}</CardTitle>
                             <p className="text-2xl font-bold">{summaryData.totalSales.value}</p>
                        </div>
                        <ChevronDown className={cn("h-5 w-5 transition-transform", openCard === summaryData.totalSales.title && "rotate-180")} />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent>
                        <InvoicesDetailView />
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>

         <Collapsible open={openCard === summaryData.paymentsReceived.title} onOpenChange={() => handleCardToggle(summaryData.paymentsReceived.title)}>
            <Card>
                <CollapsibleTrigger asChild>
                     <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
                        <div>
                            <CardTitle className="text-sm font-medium">{summaryData.paymentsReceived.title}</CardTitle>
                            <p className="text-2xl font-bold">{summaryData.paymentsReceived.value}</p>
                        </div>
                         <ChevronDown className={cn("h-5 w-5 transition-transform", openCard === summaryData.paymentsReceived.title && "rotate-180")} />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent>
                        <InvoicesDetailView />
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BiddingOverview />

        <div className="lg:col-span-2 space-y-6">
             <Card>
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

            <Card>
            <CardHeader>
              <CardTitle>Sales Return Requests</CardTitle>
              <CardDescription>Approve or reject customer return requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
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
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Sales Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            {salesTeam.map(member => (
              <div key={member.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{member.name}</span>
                  <span className="text-sm text-muted-foreground">PKR {member.achieved.toLocaleString()} / PKR {member.target.toLocaleString()}</span>
                </div>
                 <Progress value={(member.achieved / member.target) * 100} />
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

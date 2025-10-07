
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BiddingOverview } from "@/components/dashboard/bidding-overview";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, FileText, UserPlus, PackagePlus, AlertTriangle, Users, BarChart, CheckCircle2, ChevronDown, ArrowLeft } from "lucide-react";
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

const areaOrders = {
    "Faisalabad": [
        { id: "ORD-9872", customer: "Ali Clinic", booker: "Ali Khan", amount: 450000.00, status: "Delivered" },
        { id: "ORD-9871", customer: "National Hospital", booker: "Fatima Ahmed", amount: 1250000.00, status: "Shipped" },
    ],
    "Lahore": [
        { id: "ORD-9870", customer: "Lahore General", booker: "Ali Khan", amount: 820000.00, status: "Processing" },
    ],
    "Gojra": [
        { id: "ORD-9869", customer: "Gojra Medicos", booker: "Fatima Ahmed", amount: 720000.00, status: "Delivered" },
    ]
}

const selectedOrderData = {
    id: "ORD-9872",
    customer: "Ali Clinic",
    booker: "Ali Khan",
    amount: 450000.00,
    status: "Delivered",
    date: "2023-10-22",
    items: [
        { product: "Amlodipine 5mg", quantity: 100, price: 2000, total: 200000 },
        { product: "Metformin 500mg", quantity: 100, price: 1500, total: 150000 },
        { product: "Panadol 500mg", quantity: 200, price: 500, total: 100000 },
    ]
}

function OrdersDetailView({ onAreaClick, onOrderClick }: { onAreaClick: (area: string) => void, onOrderClick: (orderId: string) => void }) {
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
                        <TableRow onClick={() => onAreaClick("Faisalabad")} className="cursor-pointer">
                            <TableCell>Faisalabad</TableCell>
                            <TableCell className="text-right">589</TableCell>
                        </TableRow>
                        <TableRow onClick={() => onAreaClick("Lahore")} className="cursor-pointer">
                            <TableCell>Lahore</TableCell>
                            <TableCell className="text-right">412</TableCell>
                        </TableRow>
                         <TableRow onClick={() => onAreaClick("Gojra")} className="cursor-pointer">
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

function AreaOrdersView({ area, orders, onBack, onOrderClick }: { area: string, orders: any[], onBack: () => void, onOrderClick: (orderId: string) => void }) {
    return (
        <div>
            <Button variant="ghost" onClick={onBack} className="mb-2"><ArrowLeft className="mr-2" /> Back to Summary</Button>
            <CardTitle className="mb-4">Orders for {area}</CardTitle>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id} onClick={() => onOrderClick(order.id)} className="cursor-pointer">
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell><Badge className={statusColors[order.status]}>{order.status}</Badge></TableCell>
                            <TableCell className="text-right">PKR {order.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function OrderInvoiceView({ order, onBack }: { order: any, onBack: () => void }) {
    const subtotal = order.items.reduce((acc: number, item: any) => acc + item.total, 0);
    return (
        <div>
             <Button variant="ghost" onClick={onBack} className="mb-2"><ArrowLeft className="mr-2" /> Back to Area Orders</Button>
             <Card>
                 <CardHeader>
                     <CardTitle>Order {order.id}</CardTitle>
                     <CardDescription>
                         Customer: {order.customer} <br />
                         Booker: {order.booker} <br />
                         Date: {order.date}
                     </CardDescription>
                 </CardHeader>
                 <CardContent>
                     <Table>
                         <TableHeader>
                             <TableRow>
                                 <TableHead>Product</TableHead>
                                 <TableHead>Quantity</TableHead>
                                 <TableHead className="text-right">Unit Price</TableHead>
                                 <TableHead className="text-right">Total</TableHead>
                             </TableRow>
                         </TableHeader>
                         <TableBody>
                             {order.items.map((item: any, index: number) => (
                                <TableRow key={index}>
                                     <TableCell>{item.product}</TableCell>
                                     <TableCell>{item.quantity}</TableCell>
                                     <TableCell className="text-right">PKR {item.price.toFixed(2)}</TableCell>
                                     <TableCell className="text-right">PKR {item.total.toFixed(2)}</TableCell>
                                 </TableRow>
                             ))}
                         </TableBody>
                     </Table>
                 </CardContent>
                 <CardFooter className="flex justify-end">
                    <div className="text-right">
                        <p>Subtotal: PKR {subtotal.toFixed(2)}</p>
                        <p>Tax (17%): PKR {(subtotal * 0.17).toFixed(2)}</p>
                        <p className="font-bold text-lg">Total: PKR {(subtotal * 1.17).toFixed(2)}</p>
                    </div>
                 </CardFooter>
             </Card>
        </div>
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
    const [orderDetailState, setOrderDetailState] = useState({ view: 'tabs', area: '', orderId: '' });

    const handleCardToggle = (cardTitle: string) => {
        setOpenCard(current => {
            if (current === cardTitle) {
                if (cardTitle === summaryData.totalOrders.title) {
                    setOrderDetailState({ view: 'tabs', area: '', orderId: '' });
                }
                return null;
            }
            return cardTitle;
        });
        if (cardTitle === summaryData.totalOrders.title) {
           setOrderDetailState({ view: 'tabs', area: '', orderId: '' });
        }
    }

    const renderOrdersContent = () => {
        switch (orderDetailState.view) {
            case 'area_details':
                return <AreaOrdersView 
                            area={orderDetailState.area} 
                            orders={areaOrders[orderDetailState.area as keyof typeof areaOrders] || []}
                            onBack={() => setOrderDetailState({ view: 'tabs', area: '', orderId: '' })}
                            onOrderClick={(orderId) => setOrderDetailState(s => ({ ...s, view: 'order_invoice', orderId }))}
                        />;
            case 'order_invoice':
                return <OrderInvoiceView 
                            order={selectedOrderData}
                            onBack={() => setOrderDetailState(s => ({ ...s, view: 'area_details', orderId: '' }))}
                        />;
            case 'tabs':
            default:
                return <OrdersDetailView 
                            onAreaClick={(area) => setOrderDetailState({ view: 'area_details', area, orderId: '' })}
                            onOrderClick={(orderId) => setOrderDetailState({ view: 'order_invoice', area: '', orderId })}
                        />;
        }
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
                       {renderOrdersContent()}
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

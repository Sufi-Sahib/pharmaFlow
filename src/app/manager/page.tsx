

"use client";

import { useState, useMemo, useRef } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BiddingOverview } from "@/components/dashboard/bidding-overview";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, UserPlus, PackagePlus, AlertTriangle, Users, BarChart, CheckCircle2, ChevronDown, ArrowLeft, Truck, Edit, PlusCircle, MinusCircle, Search, Upload, Download, Camera, ShoppingBasket } from "lucide-react";
import { salesReturns, salesTeam, mockInvoices, type Order, areaOrders, customerOrders, bookerOrders, selectedOrderData, newOrders, deliveryStaff, productsWithBatches, productRequests, topSellingProducts } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const summaryData = {
    totalOrders: { title: "Total Orders", value: "1,289" },
    totalSales: { title: "Total Sales", value: "PKR 35,248,050" },
    paymentsReceived: { title: "Payments Received", value: "PKR 24,198,000" },
    receivables: { title: "Receivables", value: "PKR 11,050,050" },
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

function EditOrderView({ order, onBack, onSave }: { order: Order, onBack: () => void, onSave: (updatedOrder: Order) => void }) {
    const [editedOrder, setEditedOrder] = useState(order);
    const [searchTerm, setSearchTerm] = useState("");

    const handleQuantityChange = (productName: string, newQuantity: number) => {
        const updatedItems = editedOrder.items.map(item =>
            item.product === productName ? { ...item, quantity: Math.max(0, newQuantity), total: item.price * Math.max(0, newQuantity) } : item
        );
        const filteredItems = updatedItems.filter(item => item.quantity > 0);
        const newTotalAmount = filteredItems.reduce((acc, item) => acc + item.total, 0);
        setEditedOrder({ ...editedOrder, items: filteredItems, amount: newTotalAmount });
    };
    
    const handleAddProduct = (product: typeof productsWithBatches[0]) => {
        if (editedOrder.items.some(item => item.product === product.name)) return;
        
        const newItem = {
            product: product.name,
            quantity: 1,
            price: product.price,
            total: product.price,
        };
        
        const updatedItems = [...editedOrder.items, newItem];
        const newTotalAmount = updatedItems.reduce((acc, item) => acc + item.total, 0);
        setEditedOrder({ ...editedOrder, items: updatedItems, amount: newTotalAmount });
    }

    const availableProducts = productsWithBatches.filter(p => 
        !editedOrder.items.some(item => item.product === p.name) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Button variant="ghost" onClick={onBack} className="mb-4"><ArrowLeft className="mr-2" /> Back to Orders</Button>
            <Card>
                <CardHeader>
                    <CardTitle>Editing Order: {editedOrder.id}</CardTitle>
                    <CardDescription>Customer: {editedOrder.customer} | Booker: {editedOrder.booker}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">Order Items</h3>
                        <div className="space-y-2">
                             {editedOrder.items.map(item => (
                                <div key={item.product} className="flex items-center gap-2 border p-2 rounded-md">
                                    <div className="flex-grow">
                                        <p className="font-medium text-sm">{item.product}</p>
                                        <p className="text-xs text-muted-foreground">PKR {item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleQuantityChange(item.product, item.quantity - 1)}><MinusCircle className="h-4 w-4" /></Button>
                                        <Input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.product, parseInt(e.target.value) || 0)} className="h-8 w-14 text-center" />
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleQuantityChange(item.product, item.quantity + 1)}><PlusCircle className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                         <h3 className="font-semibold mb-2">Add Products</h3>
                         <div className="relative mb-2">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search products to add..." 
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {availableProducts.map(p => (
                                <div key={p.name} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium">{p.name}</p>
                                        <p className="text-xs text-muted-foreground">PKR {p.price.toFixed(2)}</p>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={() => handleAddProduct(p)}><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="text-lg font-bold">New Total: PKR {editedOrder.amount.toLocaleString()}</div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onBack}>Cancel</Button>
                        <Button onClick={() => onSave(editedOrder)}>Save Changes</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}


function OrderFulfillmentCard({
  orders,
  onEdit,
  onAssign,
}: {
  orders: Order[];
  onEdit: (order: Order) => void;
  onAssign: (order: Order) => void;
}) {
  const bookerSourcedOrders = orders.filter((o) => o.booker !== 'Direct');
  const customerSourcedOrders = orders.filter((o) => o.booker === 'Direct');

  const OrderList = ({ ordersToShow }: { ordersToShow: Order[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordersToShow.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell className="text-right">
              PKR {order.amount.toLocaleString()}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(order)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button size="sm" onClick={() => onAssign(order)}>
                <Truck className="mr-2 h-4 w-4" /> Assign
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>New Order Fulfillment</CardTitle>
        <CardDescription>
          Review, edit, and assign new orders for delivery.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="booker">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="booker">
              Booker Orders ({bookerSourcedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="customer">
              Customer Orders ({customerSourcedOrders.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="booker">
            <OrderList ordersToShow={bookerSourcedOrders} />
          </TabsContent>
          <TabsContent value="customer">
            <OrderList ordersToShow={customerSourcedOrders} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}


function OrdersDetailView({ onAreaClick, onCustomerClick, onBookerClick }: { onAreaClick: (area: string) => void, onCustomerClick: (customer: string) => void, onBookerClick: (booker: string) => void }) {
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
                        <TableRow onClick={() => onCustomerClick("Ali Clinic")} className="cursor-pointer">
                            <TableCell>Ali Clinic</TableCell>
                            <TableCell className="text-right">102</TableCell>
                        </TableRow>
                        <TableRow onClick={() => onCustomerClick("National Hospital")} className="cursor-pointer">
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
                        <TableRow onClick={() => onBookerClick("Ali Khan")} className="cursor-pointer">
                            <TableCell>Ali Khan</TableCell>
                            <TableCell className="text-right">700</TableCell>
                        </TableRow>
                        <TableRow onClick={() => onBookerClick("Fatima Ahmed")} className="cursor-pointer">
                            <TableCell>Fatima Ahmed</TableCell>
                            <TableCell className="text-right">589</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
    )
}

function AreaOrdersView({ area, orders, onBack, onOrderClick }: { area: string, orders: Order[], onBack: () => void, onOrderClick: (orderId: string) => void }) {
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredOrders = useMemo(() => {
        return orders.filter(order => statusFilter === 'All' || order.status === statusFilter);
    }, [orders, statusFilter]);
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" onClick={onBack} className="mb-2"><ArrowLeft className="mr-2" /> Back to Summary</Button>
                <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
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
                    {filteredOrders.map(order => (
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

function CustomerOrdersView({ customer, orders, onBack, onOrderClick }: { customer: string, orders: Order[], onBack: () => void, onOrderClick: (orderId: string) => void }) {
    const [statusFilter, setStatusFilter] = useState('All');
    
    const filteredOrders = useMemo(() => {
        return orders.filter(order => statusFilter === 'All' || order.status === statusFilter);
    }, [orders, statusFilter]);
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" onClick={onBack} className="mb-2"><ArrowLeft className="mr-2" /> Back to Summary</Button>
                <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <CardTitle className="mb-4">Orders for {customer}</CardTitle>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Booker</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map(order => (
                        <TableRow key={order.id} onClick={() => onOrderClick(order.id)} className="cursor-pointer">
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.booker}</TableCell>
                            <TableCell><Badge className={statusColors[order.status]}>{order.status}</Badge></TableCell>
                            <TableCell className="text-right">PKR {order.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function BookerOrdersView({ booker, orders, onBack, onOrderClick }: { booker: string, orders: Order[], onBack: () => void, onOrderClick: (orderId: string) => void }) {
    const [statusFilter, setStatusFilter] = useState('All');
    
    const filteredOrders = useMemo(() => {
        return orders.filter(order => statusFilter === 'All' || order.status === statusFilter);
    }, [orders, statusFilter]);
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" onClick={onBack} className="mb-2"><ArrowLeft className="mr-2" /> Back to Summary</Button>
                <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <CardTitle className="mb-4">Orders by {booker}</CardTitle>
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
                    {filteredOrders.map(order => (
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
    );
}


function OrderInvoiceView({ order, onBack, backView }: { order: any, onBack: () => void, backView: 'area_details' | 'customer_details' | 'booker_details' | 'invoices' | 'returns' }) {
    const subtotal = order.items.reduce((acc: number, item: any) => acc + item.total, 0);
    const backButtonText = () => {
        switch(backView) {
            case 'area_details': return 'Area Orders';
            case 'customer_details': return 'Customer Orders';
            case 'booker_details': return 'Booker Orders';
            case 'invoices': return 'Invoices';
            case 'returns': return 'Sales Returns';
            default: return 'Back';
        }
    }
    
    return (
        <div>
             <Button variant="ghost" onClick={onBack} className="mb-2"><ArrowLeft className="mr-2" /> Back to {backButtonText()}</Button>
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


function InvoicesDetailView({ onInvoiceClick, filter }: { onInvoiceClick: (orderId: string) => void, filter?: 'all' | 'paid' | 'unpaid' }) {
    const invoicesToDisplay = useMemo(() => {
        if (filter === 'unpaid') {
            return mockInvoices.filter(inv => inv.status !== 'Paid');
        }
        if (filter === 'paid') {
            return mockInvoices.filter(inv => inv.status === 'Paid');
        }
        return mockInvoices;
    }, [filter]);
    
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
                {invoicesToDisplay.map(invoice => (
                    <TableRow key={invoice.id} onClick={() => onInvoiceClick(invoice.id)} className="cursor-pointer">
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>Customer {invoice.id.slice(-1)}</TableCell>
                        <TableCell><Badge className={cn(statusColors[invoice.status] || 'bg-gray-100 text-gray-800')}>{invoice.status}</Badge></TableCell>
                        <TableCell className="text-right">PKR {invoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function SalesReturnListView({ onReturnClick }: { onReturnClick: (returnId: string) => void }) {
    const { toast } = useToast();
    
    const handleApprove = (e: React.MouseEvent, returnId: string) => {
        e.stopPropagation();
        toast({
            title: "Return Approved",
            description: `Sales return ${returnId} has been approved.`
        });
    }

    return (
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
              <TableRow key={r.id} onClick={() => onReturnClick(r.id)} className="cursor-pointer">
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.customer}</TableCell>
                <TableCell>PKR {r.amount.toFixed(2)}</TableCell>
                <TableCell><Badge className={statusColors[r.status]}>{r.status}</Badge></TableCell>
                <TableCell className="text-right">
                  {r.status === 'Pending' && <Button size="sm" onClick={(e) => handleApprove(e, r.id)}>Approve</Button>}
                  {r.status === 'Approved' && <span className="text-green-600 font-semibold flex items-center justify-end"><CheckCircle2 className="mr-1 h-4 w-4" /> Done</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
}

function SalesTeamMemberDetailView({ member, onBack }: { member: any, onBack: () => void }) {
    const progress = (member.achieved / member.target) * 100;
    return (
        <div>
            <Button variant="ghost" onClick={onBack} className="mb-4"><ArrowLeft className="mr-2" /> Back to Team</Button>
            <div className="mb-4">
                <CardTitle>{member.name}</CardTitle>
                <div className="flex justify-between mt-1">
                  <span className="text-sm font-medium">Sales Target</span>
                  <span className="text-sm text-muted-foreground">PKR {member.achieved.toLocaleString()} / PKR {member.target.toLocaleString()}</span>
                </div>
                 <Progress value={progress} className="mt-1" />
            </div>

            <Tabs defaultValue="invoices">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                    <TabsTrigger value="returns">Sales Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="invoices">
                    <Table>
                        <TableHeader><TableRow><TableHead>Invoice ID</TableHead><TableHead>Customer</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {mockInvoices.slice(0,2).map(invoice => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.id}</TableCell><TableCell>Customer {invoice.id.slice(-1)}</TableCell>
                                    <TableCell><Badge className={cn(statusColors[invoice.status] || 'bg-gray-100 text-gray-800')}>{invoice.status}</Badge></TableCell>
                                    <TableCell className="text-right">PKR {invoice.amount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="returns">
                     <Table>
                        <TableHeader><TableRow><TableHead>Return ID</TableHead><TableHead>Customer</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {salesReturns.slice(0,1).map(r => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.id}</TableCell><TableCell>{r.customer}</TableCell>
                                    <TableCell>PKR {r.amount.toFixed(2)}</TableCell>
                                    <TableCell><Badge className={statusColors[r.status]}>{r.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function ProductManagement() {
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerCamera = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>Add, upload, and manage your product listings.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2" /> Add New Product</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                             <DialogHeader>
                                <DialogTitle>Add a New Product</DialogTitle>
                                <DialogDescription>Fill in the details of the new product.</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                                <div className="space-y-2">
                                    <Label htmlFor="product-name">Product Name</Label>
                                    <Input id="product-name" placeholder="e.g., Paracetamol 500mg" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="product-category">Category</Label>
                                    <Input id="product-category" placeholder="e.g., Painkiller" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="product-price">Trade Price (PKR)</Label>
                                    <Input id="product-price" type="number" placeholder="450.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="product-stock">Stock Quantity</Label>
                                    <Input id="product-stock" type="number" placeholder="1000" />
                                </div>
                                 <div className="md:col-span-2 space-y-2">
                                    <Label>Product Image</Label>
                                    <div className="grid grid-cols-2 gap-4 items-center">
                                        <div className="relative border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer aspect-square flex flex-col justify-center items-center">
                                            {imagePreview ? (
                                                <Image src={imagePreview} alt="Product preview" layout="fill" objectFit="cover" className="rounded-lg" />
                                            ) : (
                                                <>
                                                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                                    <p className="text-sm font-semibold">Upload Image</p>
                                                    <p className="text-xs text-muted-foreground">Click to browse</p>
                                                </>
                                            )}
                                             <input 
                                                id="productImage" 
                                                name="productImage" 
                                                type="file" 
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                         <div className="space-y-2">
                                            <p className="text-center text-muted-foreground text-sm">Or use your camera</p>
                                            <Button type="button" variant="outline" className="w-full" onClick={triggerCamera}>
                                                <Camera className="mr-2" /> Snap Photo
                                            </Button>
                                             {/* This input is hidden but is triggered by the button above for camera access on mobile */}
                                            <input 
                                                ref={fileInputRef}
                                                type="file" 
                                                accept="image/*" 
                                                capture="environment" 
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => toast({ title: "Product Added" })}>Save Product</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div className="flex gap-2">
                        <Button variant="outline"><Upload className="mr-2" /> Upload CSV</Button>
                        <Button variant="outline"><Download className="mr-2" /> Export</Button>
                        <Button variant="link" className="p-0 h-auto">Download Format</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {productsWithBatches.map(product => (
                        <div key={product.name} className="flex items-center gap-4 p-2 rounded-lg border">
                             <Image src={product.imageUrl} alt={product.name} width={50} height={50} className="rounded-md object-cover" />
                             <div className="flex-grow">
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-muted-foreground">{product.category}</p>
                             </div>
                             <div className="text-right">
                                <p className="font-semibold">PKR {product.price.toFixed(2)}</p>
                                <Badge variant={product.inStock ? "secondary" : "destructive"}>
                                    {product.inStock ? `Stock: ${product.stock}` : 'Out of Stock'}
                                </Badge>
                             </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function ProductInsights() {
    const { toast } = useToast();
    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Product & Stock Insights</CardTitle>
                <CardDescription>Review customer requests and monitor top-selling products.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2 text-lg">Requested Products</h3>
                    <div className="space-y-3">
                        {productRequests.map(req => (
                            <div key={req.id} className="flex items-center gap-3 p-2 border rounded-lg">
                                <ShoppingBasket className="h-5 w-5 text-muted-foreground" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{req.productName}</p>
                                    <p className="text-xs text-muted-foreground">Requested by: {req.customer} | Qty: {req.quantity}</p>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => toast({ title: `Sourcing for ${req.productName} initiated.` })}>
                                    Source
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2 text-lg">Top Selling This Month</h3>
                    <div className="space-y-3">
                        {topSellingProducts.map(prod => (
                            <div key={prod.name} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                                <Image src={prod.imageUrl} alt={prod.name} width={40} height={40} className="rounded-md object-cover" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{prod.name}</p>
                                    <p className="text-xs text-muted-foreground">Sold: {prod.unitsSold} units</p>
                                </div>
                                <p className="font-bold text-green-600">PKR {prod.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function AdminDashboard() {
    const { toast } = useToast();
    const [openCard, setOpenCard] = useState<string | null>(null);
    const [orderDetailState, setOrderDetailState] = useState({ view: 'tabs', area: '', customer: '', booker: '', orderId: '' });
    const [salesDetailState, setSalesDetailState] = useState({ view: 'list', orderId: ''});
    const [paymentsDetailState, setPaymentsDetailState] = useState({ view: 'list', orderId: ''});
    const [receivablesDetailState, setReceivablesDetailState] = useState({ view: 'list', orderId: ''});
    const [salesReturnDetailState, setSalesReturnDetailState] = useState({ view: 'list', returnId: '' });
    const [salesTeamDetailState, setSalesTeamDetailState] = useState<{ view: 'list' | 'detail', memberName: string | null }>({ view: 'list', memberName: null });
    const [fulfillmentState, setFulfillmentState] = useState<{ view: 'list' | 'edit'; order: Order | null; isAssignDialogOpen: boolean; }>({ view: 'list', order: null, isAssignDialogOpen: false });
    const [liveOrders, setLiveOrders] = useState<Order[]>(newOrders);


    const handleEditOrder = (order: Order) => {
        setFulfillmentState({ view: 'edit', order: JSON.parse(JSON.stringify(order)), isAssignDialogOpen: false });
    };
    
    const handleSaveOrder = (updatedOrder: Order) => {
        setLiveOrders(prevOrders => prevOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        setFulfillmentState({ view: 'list', order: null, isAssignDialogOpen: false });
        toast({
            title: "Order Updated",
            description: `Order ${updatedOrder.id} has been successfully updated.`
        });
    }

    const handleAssignOrder = (order: Order) => {
        setFulfillmentState(s => ({ ...s, order: order, isAssignDialogOpen: true }));
    }
    
    const handleConfirmAssignment = (staffName: string) => {
        if (!fulfillmentState.order) return;
        toast({
            title: "Order Assigned",
            description: `Order ${fulfillmentState.order.id} has been assigned to ${staffName}.`
        });
        setLiveOrders(prev => prev.filter(o => o.id !== fulfillmentState.order?.id));
        setFulfillmentState({ view: 'list', order: null, isAssignDialogOpen: false });
    }

    const handleCardToggle = (cardTitle: string) => {
        setOpenCard(current => {
            if (current === cardTitle) {
                // If clicking the same card, reset its detail view state
                if (cardTitle === summaryData.totalOrders.title) setOrderDetailState({ view: 'tabs', area: '', customer: '', booker: '', orderId: '' });
                if (cardTitle === summaryData.totalSales.title) setSalesDetailState({ view: 'list', orderId: '' });
                if (cardTitle === summaryData.paymentsReceived.title) setPaymentsDetailState({ view: 'list', orderId: '' });
                if (cardTitle === summaryData.receivables.title) setReceivablesDetailState({ view: 'list', orderId: '' });
                return null;
            }
            // Reset states when switching to a new card
            setOrderDetailState({ view: 'tabs', area: '', customer: '', booker: '', orderId: '' });
            setSalesDetailState({ view: 'list', orderId: '' });
            setPaymentsDetailState({ view: 'list', orderId: '' });
            setReceivablesDetailState({ view: 'list', orderId: '' });
            setSalesReturnDetailState({ view: 'list', returnId: ''});
            setSalesTeamDetailState({ view: 'list', memberName: null });
            return cardTitle;
        });
    }

    const renderOrdersContent = () => {
        switch (orderDetailState.view) {
            case 'area_details':
                return <AreaOrdersView 
                            area={orderDetailState.area} 
                            orders={areaOrders[orderDetailState.area as keyof typeof areaOrders] || []}
                            onBack={() => setOrderDetailState({ view: 'tabs', area: '', customer: '', booker: '', orderId: '' })}
                            onOrderClick={(orderId) => setOrderDetailState(s => ({ ...s, view: 'order_invoice', orderId }))}
                        />;
            case 'customer_details':
                return <CustomerOrdersView
                            customer={orderDetailState.customer}
                            orders={customerOrders[orderDetailState.customer as keyof typeof customerOrders] || []}
                            onBack={() => setOrderDetailState({ view: 'tabs', area: '', customer: '', booker: '', orderId: '' })}
                            onOrderClick={(orderId) => setOrderDetailState(s => ({ ...s, view: 'order_invoice', orderId }))}
                        />;
            case 'booker_details':
                return <BookerOrdersView
                            booker={orderDetailState.booker}
                            orders={bookerOrders[orderDetailState.booker as keyof typeof bookerOrders] || []}
                            onBack={() => setOrderDetailState({ view: 'tabs', area: '', customer: '', booker: '', orderId: '' })}
                            onOrderClick={(orderId) => setOrderDetailState(s => ({ ...s, view: 'order_invoice', orderId }))}
                        />;
            case 'order_invoice':
                const backView = orderDetailState.area ? 'area_details' : orderDetailState.customer ? 'customer_details' : 'booker_details';
                return <OrderInvoiceView 
                            order={selectedOrderData}
                            onBack={() => setOrderDetailState(s => ({ ...s, view: backView, orderId: '' }))}
                            backView={backView}
                        />;
            case 'tabs':
            default:
                return <OrdersDetailView 
                            onAreaClick={(area) => setOrderDetailState({ view: 'area_details', area, customer: '', booker: '', orderId: '' })}
                            onCustomerClick={(customer) => setOrderDetailState({ view: 'customer_details', customer, area: '', booker: '', orderId: '' })}
                            onBookerClick={(booker) => setOrderDetailState({ view: 'booker_details', booker, area: '', customer: '', orderId: '' })}
                        />;
        }
    }

     const renderSalesContent = () => {
        if (salesDetailState.view === 'invoice_detail') {
            return <OrderInvoiceView 
                        order={selectedOrderData} 
                        onBack={() => setSalesDetailState({ view: 'list', orderId: '' })} 
                        backView="invoices"
                    />
        }
        return <InvoicesDetailView onInvoiceClick={(orderId) => setSalesDetailState({ view: 'invoice_detail', orderId })} filter="all" />
    }

    const renderPaymentsContent = () => {
        if (paymentsDetailState.view === 'invoice_detail') {
            return <OrderInvoiceView 
                        order={selectedOrderData} 
                        onBack={() => setPaymentsDetailState({ view: 'list', orderId: '' })} 
                        backView="invoices"
                    />
        }
        return <InvoicesDetailView onInvoiceClick={(orderId) => setPaymentsDetailState({ view: 'invoice_detail', orderId })} filter="paid" />
    }
    
    const renderReceivablesContent = () => {
        if (receivablesDetailState.view === 'invoice_detail') {
            return <OrderInvoiceView 
                        order={selectedOrderData} 
                        onBack={() => setReceivablesDetailState({ view: 'list', orderId: '' })} 
                        backView="invoices"
                    />
        }
        return <InvoicesDetailView onInvoiceClick={(orderId) => setReceivablesDetailState({ view: 'invoice_detail', orderId })} filter="unpaid" />
    }

    const renderSalesReturnContent = () => {
        if (salesReturnDetailState.view === 'detail') {
            const selectedReturn = salesReturns.find(r => r.id === salesReturnDetailState.returnId) || { customer: 'Unknown', id: 'Unknown', date: ''};
            const mockOrderForReturn = {
                ...selectedOrderData,
                id: selectedReturn.id,
                customer: selectedReturn.customer,
                date: selectedReturn.date,
            };
            return (
                <OrderInvoiceView 
                    order={mockOrderForReturn}
                    onBack={() => setSalesReturnDetailState({ view: 'list', returnId: '' })}
                    backView="returns"
                />
            );
        }
        return <SalesReturnListView onReturnClick={(returnId) => setSalesReturnDetailState({ view: 'detail', returnId })} />;
    }

    const renderSalesTeamContent = () => {
        if (salesTeamDetailState.view === 'detail') {
            const member = salesTeam.find(m => m.name === salesTeamDetailState.memberName);
            if (!member) return null;
            return <SalesTeamMemberDetailView member={member} onBack={() => setSalesTeamDetailState({ view: 'list', memberName: null })} />;
        }
        
        return (
            <div className="grid gap-6 sm:grid-cols-2">
            {salesTeam.map(member => (
              <div key={member.name} className="cursor-pointer" onClick={() => setSalesTeamDetailState({ view: 'detail', memberName: member.name })}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{member.name}</span>
                  <span className="text-sm text-muted-foreground">PKR {member.achieved.toLocaleString()} / PKR {member.target.toLocaleString()}</span>
                </div>
                 <Progress value={(member.achieved / member.target) * 100} className="mt-1" />
              </div>
            ))}
          </div>
        );
    }
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          
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
                       {renderSalesContent()}
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
                        {renderPaymentsContent()}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
        
        <Collapsible open={openCard === summaryData.receivables.title} onOpenChange={() => handleCardToggle(summaryData.receivables.title)}>
            <Card>
                <CollapsibleTrigger asChild>
                     <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
                        <div>
                            <CardTitle className="text-sm font-medium">{summaryData.receivables.title}</CardTitle>
                            <p className="text-2xl font-bold">{summaryData.receivables.value}</p>
                        </div>
                         <ChevronDown className={cn("h-5 w-5 transition-transform", openCard === summaryData.receivables.title && "rotate-180")} />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent>
                        {renderReceivablesContent()}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {fulfillmentState.view === 'list' ? (
            <OrderFulfillmentCard
              orders={liveOrders}
              onEdit={handleEditOrder}
              onAssign={handleAssignOrder}
            />
          ) : fulfillmentState.order ? (
            <div className="lg:col-span-3">
              <EditOrderView
                order={fulfillmentState.order}
                onBack={() => setFulfillmentState({ view: 'list', order: null, isAssignDialogOpen: false })}
                onSave={handleSaveOrder}
              />
            </div>
          ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BiddingOverview />

        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Sales Return Requests</CardTitle>
                    <CardDescription>Approve or reject customer return requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        {renderSalesReturnContent()}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductManagement />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductInsights />
      </div>

      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Sales Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {renderSalesTeamContent()}
        </CardContent>
      </Card>
      
      <Dialog open={fulfillmentState.isAssignDialogOpen} onOpenChange={(open) => setFulfillmentState(s => ({ ...s, isAssignDialogOpen: open }))}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Assign Order: {fulfillmentState.order?.id}</DialogTitle>
                <DialogDescription>Select a delivery staff member to assign this order to.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Label htmlFor="delivery-staff">Delivery Staff</Label>
                <Select>
                    <SelectTrigger id="delivery-staff">
                        <SelectValue placeholder="Select staff..." />
                    </SelectTrigger>
                    <SelectContent>
                        {deliveryStaff.map(staff => (
                            <SelectItem key={staff.id} value={staff.name}>{staff.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setFulfillmentState(s => ({...s, isAssignDialogOpen: false}))}>Cancel</Button>
                <Button onClick={() => handleConfirmAssignment("Selected Staff")}>Confirm Assignment</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
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

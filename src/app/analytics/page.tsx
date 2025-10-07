

"use client";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminAnalyticsData, superAdminAnalyticsData, type TimeFrame } from "@/lib/data";
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, BarChart3, Bell, DollarSign, Package, Search, ShoppingCart, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function StatCard({ title, value, change, changeType, icon: Icon }: { title: string, value: string, change: string, changeType: 'increase' | 'decrease', icon: React.ElementType }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                    <span className={cn("flex items-center", changeType === "increase" ? "text-green-500" : "text-red-500")}>
                        {changeType === 'increase' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {change}
                    </span>
                    <span className="ml-1">from last period</span>
                </p>
            </CardContent>
        </Card>
    );
}

function ProductPerformanceList({ products, title }: { products: { name: string, value: number, previousValue: number }[], title: string }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent className="h-96 overflow-y-auto">
                {filteredProducts.map(product => {
                    const change = product.value - product.previousValue;
                    const changePercentage = product.previousValue > 0 ? (change / product.previousValue) * 100 : 100;
                    const changeType = change >= 0 ? 'increase' : 'decrease';

                    return (
                        <div key={product.name} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xl font-bold">PKR {product.value.toLocaleString()}</p>
                            </div>
                            <div className={cn("flex items-center text-sm font-medium", changeType === 'increase' ? "text-green-500" : "text-red-500")}>
                                {changeType === 'increase' ? <BarChart3 className="h-4 w-4 mr-1 rotate-45" /> : <BarChart3 className="h-4 w-4 mr-1 -rotate-45" />}
                                <span>{changePercentage.toFixed(1)}%</span>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    );
}

function SuperAdminAnalyticsDashboard() {
    const [timeFrame, setTimeFrame] = useState<TimeFrame>('30d');
    const data = superAdminAnalyticsData[timeFrame];
    const userRole = 'Super Admin';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Platform Analytics</h1>
                    <p className="text-muted-foreground">High-level overview of the entire PharmaFlow network.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant={timeFrame === '7d' ? 'secondary' : 'outline'} onClick={() => setTimeFrame('7d')}>Last 7 Days</Button>
                    <Button variant={timeFrame === '30d' ? 'secondary' : 'outline'} onClick={() => setTimeFrame('30d')}>Last 30 Days</Button>
                    <Button variant={timeFrame === '1y' ? 'secondary' : 'outline'} onClick={() => setTimeFrame('1y')}>This Year</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Distributors" value={data.totalDistributors.current.toString()} change={`${data.totalDistributors.change}%`} changeType={data.totalDistributors.changeType} icon={Users} />
                <StatCard title="Total Platform Revenue" value={`PKR ${data.totalRevenue.current.toLocaleString()}`} change={`${data.totalRevenue.change}%`} changeType={data.totalRevenue.changeType} icon={DollarSign} />
                <StatCard title="Total Orders" value={data.totalOrders.current.toLocaleString()} change={`${data.totalOrders.change}%`} changeType={data.totalOrders.changeType} icon={ShoppingCart} />
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Platform Sales vs Target</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78%</div>
                        <Progress value={78} className="mt-2" />
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ProductPerformanceList products={data.topProductsByRevenue} title="Top Products by Revenue" />

                <Card>
                    <CardHeader>
                        <CardTitle>Platform Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Bell className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                                <p className="font-semibold">New Distributor Onboarded</p>
                                <p className="text-sm text-muted-foreground">"Gojra Pharma" has joined the network. | 2 days ago</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <ArrowUp className="h-5 w-5 text-green-600 mt-1" />
                            <div>
                                <p className="font-semibold">Record Sales Day</p>
                                <p className="text-sm text-muted-foreground">Platform revenue exceeded PKR 5M yesterday. | 1 day ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Distributor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data.salesByDistributor} layout="vertical" margin={{ left: 100 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={150} tickLine={false} axisLine={false} />
                        <Tooltip formatter={(value: number) => `PKR ${value.toLocaleString()}`} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
            </div>
        </div>
    );
}


function AdminAnalyticsDashboard() {
    const [timeFrame, setTimeFrame] = useState<TimeFrame>('30d');
    const data = adminAnalyticsData[timeFrame];
    const userRole = 'Admin';

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Distributor Analytics</h1>
                    <p className="text-muted-foreground">Performance overview for your distribution business.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant={timeFrame === '7d' ? 'secondary' : 'outline'} onClick={() => setTimeFrame('7d')}>Last 7 Days</Button>
                    <Button variant={timeFrame === '30d' ? 'secondary' : 'outline'} onClick={() => setTimeFrame('30d')}>Last 30 Days</Button>
                    <Button variant={timeFrame === '1y' ? 'secondary' : 'outline'} onClick={() => setTimeFrame('1y')}>This Year</Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`PKR ${data.totalRevenue.current.toLocaleString()}`} change={`${data.totalRevenue.change}%`} changeType={data.totalRevenue.changeType} icon={DollarSign} />
                <StatCard title="Total Orders" value={data.totalOrders.current.toLocaleString()} change={`${data.totalOrders.change}%`} changeType={data.totalOrders.changeType} icon={ShoppingCart} />
                <StatCard title="New Customers" value={data.newCustomers.current.toString()} change={`${data.newCustomers.change}%`} changeType={data.newCustomers.changeType} icon={Users} />
                <StatCard title="Avg. Order Value" value={`PKR ${data.avgOrderValue.current.toLocaleString()}`} change={`${data.avgOrderValue.change}%`} changeType={data.avgOrderValue.changeType} icon={Package} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductPerformanceList products={data.topProductsByRevenue} title="Top Products by Revenue" />
                <ProductPerformanceList products={data.topProductsByVolume} title="Top Products by Volume" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Promising New Customers</CardTitle>
                    <CardDescription>New customers with frequent cash purchases.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer Name</TableHead>
                                <TableHead className="text-right">Total Purchases</TableHead>
                                <TableHead className="text-right">Total Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.promisingNewCustomers.map(customer => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell className="text-right">{customer.purchases}</TableCell>
                                    <TableCell className="text-right">PKR {customer.totalValue.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AnalyticsPage() {
  // In a real app, user role would come from an auth context.
  const userRole = "Super Admin"; 

  const renderDashboard = () => {
      switch (userRole) {
          case "Super Admin":
              return <SuperAdminAnalyticsDashboard />;
          case "Admin":
          case "Manager":
              return <AdminAnalyticsDashboard />;
          default:
              return (
                  <Card>
                      <CardHeader>
                          <CardTitle>Access Denied</CardTitle>
                          <CardDescription>You do not have permission to view this page.</CardDescription>
                      </CardHeader>
                  </Card>
              );
      }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          {renderDashboard()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    
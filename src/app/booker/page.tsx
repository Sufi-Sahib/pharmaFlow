
"use client";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, MapPin, Search, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const customers = [
    { name: "City Clinic", address: "123 Main St", status: "Order Taken" },
    { name: "Wellness Pharmacy", address: "456 Oak Ave", status: "Pending" },
    { name: "HealthFirst Meds", address: "789 Pine Ln", status: "Pending" },
];

const products = [
    { name: "Amlodipine 5mg", stock: 150 },
    { name: "Metformin 500mg", stock: 25 },
    { name: "Atorvastatin 20mg", stock: 300 },
];

function BookerHome() {
  const [view, setView] = useState("home");
  const [isOnline, setIsOnline] = useState(true);

  if (view === 'order') {
    return <BookerOrderPlacement goBack={() => setView('home')} isOnline={isOnline} setIsOnline={setIsOnline} />;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
        <div>
            <Button className="w-full mb-6" size="lg" onClick={() => setView('order')}>New Order</Button>
            <Card>
                <CardHeader>
                    <CardTitle>Live GPS Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Map className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="flex gap-2">
                        <Button className="w-full" variant="outline">Check-In</Button>
                        <Button className="w-full" variant="outline">Check-Out</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Today's Route</CardTitle>
                 <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search customers..." className="pl-8" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {customers.map(customer => (
                    <div key={customer.name} className="flex items-center gap-4">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-grow">
                            <p className="font-semibold">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.address}</p>
                        </div>
                        <Badge variant={customer.status === "Order Taken" ? "default" : "secondary"}>{customer.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}

function BookerOrderPlacement({ goBack, isOnline, setIsOnline }: { goBack: () => void; isOnline: boolean; setIsOnline: (isOnline: boolean) => void }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <CardTitle>Place New Order</CardTitle>
                <div className="flex items-center space-x-2">
                    {isOnline ? <Wifi className="text-green-500" /> : <WifiOff className="text-red-500" />}
                    <Label htmlFor="online-status">{isOnline ? "Online" : "Offline"}</Label>
                    <Switch id="online-status" checked={isOnline} onCheckedChange={setIsOnline} />
                </div>
            </div>

            {!isOnline && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg mb-4">
                    <div className="flex items-center">
                        <AlertTriangle className="mr-3" />
                        <div>
                            <p className="font-bold">You are in Offline Mode</p>
                            <p className="text-sm">Your order will be saved locally and synced when you're back online.</p>
                        </div>
                    </div>
                </div>
            )}

            <Card>
                 <CardContent className="pt-6 space-y-4">
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                        <SelectContent>
                            {customers.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {products.map(p => (
                            <div key={p.name} className="flex items-center justify-between gap-4 border p-2 rounded-lg">
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-sm text-muted-foreground">In Stock: {p.stock}</p>
                                </div>
                                <Input type="number" placeholder="Qty" className="w-24" />
                            </div>
                        ))}
                    </div>
                    <Button className="w-full" size="lg">
                        {isOnline ? "Confirm & Submit Order" : "Save Order Offline"}
                    </Button>
                     <Button className="w-full" size="lg" variant="outline" onClick={goBack}>Back to Home</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default function BookerPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <BookerHome />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


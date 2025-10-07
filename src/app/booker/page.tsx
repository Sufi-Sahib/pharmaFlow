
"use client";
import { useState }from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Wifi, WifiOff, AlertTriangle, Undo2, PlusCircle, MinusCircle, LocateFixed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { customers, productsWithBatches as products } from "@/lib/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { useToast } from "@/hooks/use-toast";
import { useGeo } from "@/context/geo-provider";

function BookerHome() {
  const [view, setView] = useState("home");
  const { toast } = useToast();
  const { lastLocation, error, loading, stampAction } = useGeoLocation();

  const handleCheckIn = async () => {
    const result = await stampAction("route_check_in", { customerId: "all" });
    if (result.status === 'queued') {
      toast({ title: "Offline", description: "Check-in action queued." });
    } else if (result.status === 'success') {
      toast({ title: "Checked In!", description: `Stamped at: ${lastLocation?.latitude}, ${lastLocation?.longitude}` });
    } else {
        toast({ title: "Sync Error", description: "Could not sync check-in. It has been queued.", variant: "destructive" });
    }
  }

  const handleCheckOut = async () => {
    const result = await stampAction("route_check_out", { customerId: "all" });
    if (result.status === 'queued') {
      toast({ title: "Offline", description: "Check-out action queued." });
    } else if (result.status === 'success') {
      toast({ title: "Checked Out!", description: "Route concluded." });
    } else {
        toast({ title: "Sync Error", description: "Could not sync check-out. It has been queued.", variant: "destructive" });
    }
  }
  
  const handleViewChange = (newView: string) => setView(newView);

  if (view === 'order') {
    return <BookerOrderPlacement goBack={() => handleViewChange('home')} />;
  }
  if (view === 'return') {
    return <BookerSalesReturn goBack={() => handleViewChange('home')} />;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
        <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button size="lg" onClick={() => handleViewChange('order')}>New Order</Button>
              <Button size="lg" variant="outline" onClick={() => handleViewChange('return')}><Undo2 className="mr-2" />Initiate Return</Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Action-Based Geo-Stamping</CardTitle>
                    <CardDescription>Capture location for key events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Alert>
                        <LocateFixed className="h-4 w-4" />
                        <AlertTitle>Location Stamping</AlertTitle>
                        <AlertDescription>
                          We capture a one-time location stamp for actions like checking in. We don’t track you in the background.
                        </AlertDescription>
                    </Alert>
                    {error && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Location Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                    <div className="flex gap-2">
                        <Button className="w-full" variant="outline" onClick={handleCheckIn} disabled={loading}>{loading ? 'Stamping...' : 'Check-In (Stamp Location)'}</Button>
                        <Button className="w-full" variant="outline" onClick={handleCheckOut} disabled={loading}>{loading ? 'Stamping...' : 'Check-Out'}</Button>
                    </div>
                    {lastLocation && <p className="text-xs text-center text-muted-foreground">Last stamp: {lastLocation.latitude.toFixed(4)}, {lastLocation.longitude.toFixed(4)}</p>}
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

function BookerOrderPlacement({ goBack }: { goBack: () => void; }) {
    const { status: geoStatus } = useGeo();
    const isOnline = geoStatus === 'online' || geoStatus === 'syncing';
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const { toast } = useToast();
    const { loading, stampAction } = useGeoLocation();
    
    const handleQuantityChange = (productName: string, quantity: number) => {
        setQuantities(prev => ({...prev, [productName]: Math.max(0, quantity)}));
    }

    const calculateBonus = (quantity: number) => {
        return Math.floor(quantity / 10);
    }
    
    const handleSubmitOrder = async () => {
        const orderItems = Object.entries(quantities).filter(([,qty]) => qty > 0).map(([name, quantity]) => ({name, quantity, bonus: calculateBonus(quantity)}));
        if(orderItems.length === 0) {
            toast({title: "Empty Order", description: "Please add items to the order.", variant: "destructive"});
            return;
        }
        
        const result = await stampAction("order_create_submit", { items: orderItems });
        
        if (result.status === 'queued') {
          toast({ title: "Offline", description: "Order saved locally and will be synced when online." });
        } else if (result.status === 'success') {
          toast({ title: "Order Submitted!", description: "The order has been successfully submitted." });
        } else {
            toast({ title: "Sync Error", description: "Could not submit order. It has been queued for later.", variant: "destructive" });
        }
        goBack();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <CardTitle>Place New Order</CardTitle>
            </div>

            {!isOnline && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle />
                  <AlertTitle>You are in Offline Mode</AlertTitle>
                  <AlertDescription>Your order will be saved locally and synced when you're back online.</AlertDescription>
                </Alert>
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

                     <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-800 text-lg">Customer Credit</CardTitle>
                            <CardDescription>Real-time credit status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-blue-900">PKR 540,000 <span className="text-sm font-normal text-muted-foreground">/ PKR 1,500,000</span></p>
                        </CardContent>
                    </Card>


                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {products.map(p => {
                            const qty = quantities[p.name] || 0;
                            const bonus = calculateBonus(qty);
                            return (
                                <div key={p.name} className="flex flex-col gap-2 border p-3 rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                      <div>
                                          <p className="font-semibold">{p.name}</p>
                                          <p className="text-sm text-muted-foreground">In Stock: {p.stock}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(p.name, qty - 1)}><MinusCircle className="h-5 w-5" /></Button>
                                          <Input type="number" placeholder="Qty" className="w-20 text-center" value={qty} onChange={e => handleQuantityChange(p.name, parseInt(e.target.value) || 0)} />
                                          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(p.name, qty + 1)}><PlusCircle className="h-5 w-5" /></Button>
                                      </div>
                                    </div>
                                    {bonus > 0 && (
                                        <div className="bg-amber-100 text-amber-800 p-2 rounded-md text-sm font-medium flex justify-center items-center">
                                            Bonus: {bonus} units (10+1 Scheme)
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <Button className="w-full" size="lg" onClick={handleSubmitOrder} disabled={loading}>
                        {loading ? "Processing..." : (isOnline ? "Confirm & Submit Order" : "Save Order Offline")}
                    </Button>
                     <Button className="w-full" size="lg" variant="outline" onClick={goBack}>Back to Home</Button>
                </CardContent>
            </Card>
        </div>
    )
}

function BookerSalesReturn({ goBack }: { goBack: () => void; }) {
    return (
        <div>
            <CardTitle className="mb-4">Initiate Sales Return</CardTitle>
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
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Original Invoice" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inv-001">INV-001 - PKR 45000.00</SelectItem>
                            <SelectItem value="inv-002">INV-002 - PKR 125000.00</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {products.slice(0,2).map(p => (
                            <div key={p.name} className="flex items-center justify-between gap-4 border p-2 rounded-lg">
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-sm text-muted-foreground">Purchased: 50</p>
                                </div>
                                <Input type="number" placeholder="Return Qty" className="w-24" />
                            </div>
                        ))}
                    </div>
                     <Button className="w-full" size="lg">Request Return</Button>
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

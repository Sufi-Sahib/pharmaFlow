
"use client";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { sampleBid } from "@/lib/data";
import Image from "next/image";
import { ShoppingCart, Tag, Search, Bell } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const products = [
    {
        name: "Amlodipine 5mg",
        category: "Cardiovascular",
        imageUrl: "https://picsum.photos/seed/product1/200/200",
        price: 20.00,
        inStock: true
    },
    {
        name: "Metformin 500mg",
        category: "Diabetes",
        imageUrl: "https://picsum.photos/seed/product2/200/200",
        price: 15.75,
        inStock: true
    },
    {
        name: "Atorvastatin 20mg",
        category: "Cardiovascular",
        imageUrl: "https://picsum.photos/seed/product3/200/200",
        price: 35.50,
        inStock: false
    },
];

function ProductCard({ product }: { product: (typeof products)[0] }) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="relative">
                    <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="w-full h-32 object-cover rounded-md mb-4" data-ai-hint="medicine box" />
                    <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex gap-2 p-4 pt-0">
                <Dialog>
                    <DialogTrigger asChild>
                         <Button variant="outline" size="sm" className="w-full">
                            <Tag className="mr-2 h-4 w-4" /> Request Price
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Request a Price for {product.name}</DialogTitle>
                            <DialogDescription>
                                Submit your desired price and a reason for the request. An admin will review it shortly.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="desiredPrice" className="text-right">Desired Price</Label>
                                <Input id="desiredPrice" type="number" className="col-span-3" placeholder="$18.00" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="reason" className="text-right">Reason</Label>
                                <Textarea id="reason" className="col-span-3" placeholder="e.g., Matching a competitor's price" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Submit Bid</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                
                <Button size="sm" className="w-full" disabled={!product.inStock}>
                     {product.inStock ? <><ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart</> : 'Out of Stock'}
                </Button>
            </CardFooter>
        </Card>
    )
}

function B2BPortal() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                               <CardTitle className="font-headline">Welcome, City Clinic!</CardTitle>
                               <CardDescription>Your dedicated B2B portal for all procurement needs.</CardDescription>
                            </div>
                             <div className="relative">
                                <Button variant="ghost" size="icon">
                                    <ShoppingCart />
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">3</Badge>
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search products..." className="pl-8" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <div className="flex gap-2 pt-2">
                            <Button variant="secondary">Cardiovascular</Button>
                            <Button variant="outline">Diabetes</Button>
                             <Button variant="outline">Antibiotics</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {products.map(p => <ProductCard key={p.name} product={p} />)}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Cart</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Image src="https://picsum.photos/seed/cart1/50/50" alt="product" width={40} height={40} className="rounded-md" />
                            <div className="flex-grow">
                                <p className="font-semibold">Amlodipine 5mg</p>
                                <p className="text-xs text-muted-foreground">$20.00</p>
                            </div>
                            <Input type="number" defaultValue={10} className="w-16" />
                        </div>
                         <p className="text-right font-semibold pt-2">Total: $200.00</p>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full">Request Full Cart Discount</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>My Bids</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-2">
                             <Image src={sampleBid.product.imageUrl} alt={sampleBid.product.name} width={40} height={40} className="rounded-md" data-ai-hint="medicine box" />
                             <div className="flex-grow">
                                <p className="font-semibold text-sm">{sampleBid.product.name}</p>
                                <p className="text-xs text-muted-foreground">You bid: ${sampleBid.requestedPrice.toFixed(2)}</p>
                             </div>
                             <Badge variant="secondary">{sampleBid.status}</Badge>
                        </div>
                        <div className="border bg-amber-50 p-3 rounded-lg">
                             <p className="text-sm font-semibold text-amber-800">Counter-Offer: $19.25</p>
                             <div className="flex gap-2 mt-2">
                                <Button size="sm" className="w-full">Accept</Button>
                                <Button size="sm" variant="destructive" className="w-full">Reject</Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function CustomerPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <main className="p-4 lg:p-6">
                    <B2BPortal />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

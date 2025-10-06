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
import { ShoppingCart, Tag, Search } from "lucide-react";

const products = [
    {
        name: "Amlodipine 5mg",
        imageUrl: "https://picsum.photos/seed/product1/200/200",
        price: 20.00
    },
    {
        name: "Metformin 500mg",
        imageUrl: "https://picsum.photos/seed/product2/200/200",
        price: 15.75
    },
    {
        name: "Atorvastatin 20mg",
        imageUrl: "https://picsum.photos/seed/product3/200/200",
        price: 35.50
    },
];

function ProductCard({ product }: { product: (typeof products)[0] }) {
    return (
        <Card>
            <CardContent className="p-4">
                <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="w-full h-32 object-cover rounded-md mb-4" data-ai-hint="medicine box" />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex gap-2 p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full">
                    <Tag className="mr-2 h-4 w-4" /> Request Price
                </Button>
                <Button size="sm" className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}

function B2BPortal() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <div className="flex gap-2 pt-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search products..." className="pl-8" />
                            </div>
                            <Button variant="outline">Category 1</Button>
                            <Button variant="outline">Category 2</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {products.map(p => <ProductCard key={p.name} product={p} />)}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Shopping Cart</CardTitle>
                        <Badge variant="secondary">3 items</Badge>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full">Request Full Cart Discount</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>My Bids</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-2">
                             <Image src={sampleBid.product.imageUrl} alt={sampleBid.product.name} width={40} height={40} className="rounded-md" data-ai-hint="medicine box" />
                             <div className="flex-grow">
                                <p className="font-semibold text-sm">{sampleBid.product.name}</p>
                                <p className="text-xs text-muted-foreground">You bid: ${sampleBid.requestedPrice.toFixed(2)}</p>
                             </div>
                             <Badge variant="secondary">{sampleBid.status}</Badge>
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

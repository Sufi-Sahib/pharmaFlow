
"use client";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { sampleBid, productsWithBatches as products, salesReturns } from "@/lib/data";
import Image from "next/image";
import { ShoppingCart, Tag, Search, Bell, Undo2, History, FileText, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useGeoLocation } from "@/hooks/use-geo-location";


function ProductCard({ product }: { product: (typeof products)[0] }) {
    return (
        <Card className="flex flex-col">
            <CardContent className="p-4 flex-grow">
                <div className="relative">
                    <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="w-full h-32 object-cover rounded-md mb-4" data-ai-hint="medicine box" />
                    <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">PKR {product.price.toFixed(2)}</p>
                 <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs">View Batches</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Available Batches for {product.name}</DialogTitle>
                        </DialogHeader>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Batch #</TableHead>
                                    <TableHead>Expiry</TableHead>
                                    <TableHead>Stock</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {product.batches.map(batch => (
                                    <TableRow key={batch.batchNumber}>
                                        <TableCell>{batch.batchNumber}</TableCell>
                                        <TableCell>{batch.expiryDate}</TableCell>
                                        <TableCell>{batch.stock}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>
                {product.lastOrder && (
                    <div className="mt-2 text-xs text-muted-foreground bg-gray-50 p-2 rounded-md border">
                        <p className="font-semibold flex items-center gap-1"><History className="h-3 w-3"/>Last Order:</p>
                        <span>{product.lastOrder.quantity} units on {product.lastOrder.date} at PKR {product.lastOrder.price.toFixed(2)}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex gap-2 p-4 pt-2">
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
                                <Input id="desiredPrice" type="number" className="col-span-3" placeholder="PKR 1800.00" />
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

function RequestProductDialog() {
    const { toast } = useToast();
    const { stampAction } = useGeoLocation();

    const handleRequestSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const productData = {
            name: formData.get('productName'),
            quantity: formData.get('quantity'),
            targetPrice: formData.get('targetPrice'),
            // Image handling would be more complex in a real app
        };

        if (!productData.name || !productData.quantity || !productData.targetPrice) {
            toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive"});
            return;
        }

        const result = await stampAction('product_request', productData);

        if (result.status === 'queued') {
            toast({ title: "Offline", description: "Product request saved locally and will be synced when online." });
        } else if (result.status === 'success') {
            toast({ title: "Request Submitted!", description: "Your product request has been submitted for review." });
        } else {
            toast({ title: "Sync Error", description: "Could not submit request. It has been queued for later.", variant: "destructive" });
        }
        
        // Find the dialog close button and click it to close the modal
        // This is a workaround for not having direct control over the dialog's open state here
        document.getElementById('close-request-product-dialog')?.click();
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Request a Product</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleRequestSubmit}>
                    <DialogHeader>
                        <DialogTitle>Request a New Product</DialogTitle>
                        <DialogDescription>
                            Can't find what you're looking for? Request it here and we'll try to source it for you.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="productName" className="text-right">Product Name</Label>
                            <Input id="productName" name="productName" className="col-span-3" placeholder="e.g., Paracetamol 500mg" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">Quantity</Label>
                            <Input id="quantity" name="quantity" type="number" className="col-span-3" placeholder="e.g., 1000" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="targetPrice" className="text-right">Target Price</Label>
                            <Input id="targetPrice" name="targetPrice" type="number" className="col-span-3" placeholder="PKR 150.00" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                             <Label htmlFor="productImage" className="text-right">Image</Label>
                            <div className="col-span-3 border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                                <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm font-semibold">Upload Image</p>
                                <input id="productImage" name="productImage" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            </div>
                         </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


function B2BPortal() {
    const [view, setView] = useState('products');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                               <CardTitle className="font-headline">Welcome, Ali Clinic!</CardTitle>
                               <CardDescription>Your dedicated B2B portal for all procurement needs.</CardDescription>
                            </div>
                             <div className="flex items-center gap-2">
                                <RequestProductDialog />
                                <div className="relative">
                                    <Button variant="ghost" size="icon">
                                        <ShoppingCart />
                                        <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">3</Badge>
                                    </Button>
                                </div>
                            </div>
                        </div>
                         <div className="flex gap-2 pt-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search products..." className="pl-8" />
                            </div>
                            <Button variant={view === 'products' ? 'secondary' : 'outline'} onClick={() => setView('products')}>Products</Button>
                            <Button variant={view === 'returns' ? 'secondary' : 'outline'} onClick={() => setView('returns')}>My Returns</Button>
                        </div>
                    </CardHeader>
                </Card>
                 
                 {view === 'products' ? (
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
                 ) : (
                    <SalesReturnView />
                 )}
                 
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
                                <p className="text-xs text-muted-foreground">PKR 2000.00</p>
                            </div>
                            <Input type="number" defaultValue={10} className="w-16" />
                        </div>
                         <p className="text-right font-semibold pt-2">Total: PKR 20000.00</p>
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
                                <p className="text-xs text-muted-foreground">You bid: PKR {sampleBid.requestedPrice.toFixed(2)}</p>
                             </div>
                             <Badge variant="secondary">{sampleBid.status}</Badge>
                        </div>
                        <div className="border bg-amber-50 p-3 rounded-lg">
                             <p className="text-sm font-semibold text-amber-800">Counter-Offer: PKR 1925.00</p>
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

function SalesReturnView() {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>My Sales Returns</CardTitle>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button><Undo2 className="mr-2 h-4 w-4" /> Request New Return</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Request a Sales Return</DialogTitle>
                            <DialogDescription>Select the invoice and products you wish to return.</DialogDescription>
                        </DialogHeader>
                         <div className="grid gap-4 py-4">
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select an Invoice" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inv-001">INV-001</SelectItem>
                                    <SelectItem value="inv-002">INV-002</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm font-medium">Select products to return:</p>
                             <div className="space-y-2">
                                <div className="flex items-center justify-between gap-4 border p-2 rounded-lg">
                                    <div>
                                        <p className="font-semibold">Amlodipine 5mg</p>
                                        <p className="text-sm text-muted-foreground">Purchased: 50</p>
                                    </div>
                                    <Input type="number" placeholder="Return Qty" className="w-24" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button>Submit Return Request</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Return ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {salesReturns.map(r => (
                            <TableRow key={r.id}>
                                <TableCell>{r.id}</TableCell>
                                <TableCell>{r.date}</TableCell>
                                <TableCell>{r.invoiceId}</TableCell>
                                <TableCell><Badge variant={r.status === 'Approved' ? 'default' : 'secondary'}>{r.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
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

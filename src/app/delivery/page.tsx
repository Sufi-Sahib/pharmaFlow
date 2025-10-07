
"use client";
import { useState } from 'react';
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, CheckCircle2, FileUp, ChevronsUpDown, Undo2, Truck, FileText, LocateFixed, AlertTriangle } from "lucide-react";
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { activeDeliveries } from "@/lib/data";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useGeoLocation } from '@/hooks/use-geo-location';
import { useToast } from '@/hooks/use-toast';

function DeliveryTaskList({ onSelectTask }: { onSelectTask: (task: any) => void }) {
    return (
        <div className="space-y-6">
            <Alert>
                <LocateFixed className="h-4 w-4" />
                <AlertTitle>Action-Based Location</AlertTitle>
                <AlertDescription>
                    We capture a one-time location stamp when you confirm a payment. We do not track you in the background.
                </AlertDescription>
            </Alert>
            <Card>
                <CardHeader><CardTitle>Digital Delivery Challan</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {activeDeliveries.sort((a,b) => a.status === 'Delivered' ? 1 : -1).map(task => (
                        <Card 
                            key={task.id} 
                            onClick={() => onSelectTask(task)} 
                            className={cn(
                                "cursor-pointer transition-all hover:shadow-md",
                                task.status === 'Delivered' && "bg-gray-50 opacity-60"
                            )}>
                            <CardContent className="p-4 flex items-center gap-4">
                                {task.status === 'Delivered' ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Truck className="h-6 w-6 text-primary" />}
                                <div className="flex-grow">
                                    <p className={cn("font-semibold", task.status === 'Delivered' && "line-through")}>{task.customer}</p>
                                    <p className="text-sm text-muted-foreground">{task.address}</p>
                                    <p className="text-xs text-muted-foreground">{task.itemsCount} items</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">PKR {task.amount.toFixed(2)}</p>
                                    <Badge variant={task.status === "Delivered" ? "secondary" : "default"}>{task.status}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

function PaymentCollectionScreen({ task, goBack }: { task: any; goBack: () => void }) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isReturning, setIsReturning] = useState(false);
    const { toast } = useToast();
    const { stampAction, loading, error } = useGeoLocation();

    const handlePayment = async (method: string, details: any) => {
        const result = await stampAction(`payment_${method}`, { orderId: task.id, ...details });
         if (result.queued) {
            toast({ title: "Offline", description: `Payment action queued.` });
        } else if (result.success) {
            toast({ title: "Payment Confirmed!", description: "Transaction has been logged." });
        } else {
            toast({ title: "Sync Error", description: `Could not sync payment. It has been queued.`, variant: "destructive" });
        }
        setIsConfirmed(true);
    }

    if (isConfirmed) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8">
                 <CheckCircle2 className="h-24 w-24 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold font-headline mb-2">Payment Confirmed!</h2>
                <CardDescription>Transaction for {task.customer} has been logged.</CardDescription>
                <Button onClick={goBack} className="mt-8">Back to Task List</Button>
            </div>
        )
    }

    if (isReturning) {
        return (
             <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>On-Spot Sales Return</CardTitle>
                    <CardDescription>For Order ID: {task.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4 border p-2 rounded-lg">
                            <div>
                                <p className="font-semibold">Amoxicillin 250mg</p>
                                <p className="text-sm text-muted-foreground">Delivered: 20</p>
                            </div>
                            <Input type="number" placeholder="Return Qty" className="w-24" />
                        </div>
                    </div>
                    <Textarea placeholder="Reason for return..." />
                </CardContent>
                 <CardFooter className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsReturning(false)} className="w-full">Cancel</Button>
                    <Button onClick={() => { setIsReturning(false); setIsConfirmed(true); }} className="w-full">Confirm Return</Button>
                </CardFooter>
            </Card>
        )
    }


    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Collect Payment: {task.customer}</CardTitle>
                <CardDescription>Order ID: {task.id} | Items: {task.itemsCount}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {error && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Location Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                <div className="text-center bg-muted p-6 rounded-lg">
                    <p className="text-muted-foreground">Total Amount Due</p>
                    <p className="text-5xl font-bold font-headline">PKR {task.amount.toFixed(2)}</p>
                </div>
                 <Button variant="outline" className="w-full" onClick={() => setIsReturning(true)}>
                    <Undo2 className="mr-2" /> Initiate On-Spot Return
                </Button>
                <div className="space-y-4">
                     <p className="font-semibold text-center">Select Payment Method</p>
                     <RadioGroup onValueChange={(value) => handlePayment(value, { amount: task.amount })}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash_received" id="cash" />
                            <Label htmlFor="cash" className="flex-grow text-base">Mark as Full Cash Received</Label>
                        </div>
                    </RadioGroup>
                    <div className="relative border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="font-semibold">Upload Cheque Image</p>
                        <p className="text-sm text-muted-foreground">For partial or full payment</p>
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={() => handlePayment('cheque_received', { amount: task.amount })} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={goBack} className="w-full">Back to Task List</Button>
            </CardFooter>
        </Card>
    )
}

export default function DeliveryPage() {
  const [selectedTask, setSelectedTask] = useState<any>(null);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          {selectedTask ? 
            <PaymentCollectionScreen task={selectedTask} goBack={() => setSelectedTask(null)} /> :
            <DeliveryTaskList onSelectTask={setSelectedTask} />
          }
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

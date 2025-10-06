
"use client";
import { useState } from 'react';
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, CheckCircle2, FileUp } from "lucide-react";
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const deliveryTasks = [
    { id: "ORD-9871", customer: "Wellness Pharmacy", address: "456 Oak Ave", amount: 1250.00, status: "Picked" },
    { id: "ORD-9869", customer: "City Clinic", address: "123 Main St", amount: 300.00, status: "On the Way" },
    { id: "ORD-9868", customer: "Southside Meds", address: "321 Elm St", amount: 620.00, status: "Pending" },
    { id: "ORD-9867", customer: "North General", address: "999 Maple Dr", amount: 150.00, status: "Delivered" },
];

type TaskStatus = "Pending" | "Picked" | "On the Way" | "Delivered";

function DeliveryTaskList({ onSelectTask }: { onSelectTask: (task: any) => void }) {
    return (
        <div className="grid lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle>Live Map Navigation</CardTitle></CardHeader>
                <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Map className="h-16 w-16 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Task Feed</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {deliveryTasks.sort((a,b) => a.status === 'Delivered' ? 1 : -1).map(task => (
                        <Card 
                            key={task.id} 
                            onClick={() => onSelectTask(task)} 
                            className={cn(
                                "cursor-pointer transition-all hover:shadow-md",
                                task.status === 'Delivered' && "bg-gray-50 opacity-60"
                            )}>
                            <CardContent className="p-4 flex items-center gap-4">
                                {task.status === 'Delivered' ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <div className="h-6 w-6 bg-primary rounded-full" />}
                                <div className="flex-grow">
                                    <p className={cn("font-semibold", task.status === 'Delivered' && "line-through")}>{task.customer}</p>
                                    <p className="text-sm text-muted-foreground">{task.address}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">${task.amount.toFixed(2)}</p>
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

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Collect Payment: {task.customer}</CardTitle>
                <CardDescription>Order ID: {task.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center bg-muted p-6 rounded-lg">
                    <p className="text-muted-foreground">Total Amount Due</p>
                    <p className="text-5xl font-bold font-headline">${task.amount.toFixed(2)}</p>
                </div>
                <div className="space-y-4">
                     <RadioGroup defaultValue="cash" onValueChange={() => setIsConfirmed(true)}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex-grow text-base">Mark as Cash Received</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gateway" id="gateway" />
                            <Label htmlFor="gateway" className="flex-grow text-base">Confirm Gateway Paid</Label>
                        </div>
                    </RadioGroup>
                    <div className="relative border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <FileUp className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="font-semibold">Upload Payment Slip</p>
                        <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={() => setIsConfirmed(true)} />
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


"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { distributors as initialDistributors, type Distributor } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpTooltip } from "@/components/ui/help-tooltip";

function DistributorCard({ distributor, onUpdate }: { distributor: Distributor; onUpdate: (id: string, updates: Partial<Distributor>) => void; }) {
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [kycConfirmed, setKycConfirmed] = useState(false);

  const statusColors: { [key: string]: string } = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Suspended: "bg-orange-100 text-orange-800"
  };

  const commission = distributor.currentSales * 0.05;

  const handleStatusChange = (newStatus: Distributor['status']) => {
    onUpdate(distributor.id, { status: newStatus });
    if(newStatus === 'Approved') {
        setIsApprovalDialogOpen(false);
    }
  };
  
  const handlePackageChange = (newPackage: Distributor['package']) => {
     onUpdate(distributor.id, { package: newPackage });
     setIsPackageDialogOpen(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{distributor.companyName}</CardTitle>
                <CardDescription>Package: {distributor.package}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <HelpTooltip>
                This card shows a summary of the distributor's account, including their status, resource usage, and monthly performance.
              </HelpTooltip>
              <Badge className={statusColors[distributor.status]}>{distributor.status}</Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Bookers</span>
                    <span>{distributor.bookers.current} / {distributor.bookers.max}</span>
                </div>
                <Progress value={(distributor.bookers.current / distributor.bookers.max) * 100} />
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Delivery Staff</span>
                    <span>{distributor.deliveryStaff.current} / {distributor.deliveryStaff.max}</span>
                </div>
                <Progress value={(distributor.deliveryStaff.current / distributor.deliveryStaff.max) * 100} />
            </div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Monthly Performance</h4>
            <div className="flex justify-between text-sm">
                <span>Current Sales</span>
                <span>PKR {distributor.currentSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mt-1 text-red-600 font-medium">
                <span>Commission Charge</span>
                <span>PKR {commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex w-full gap-2">
          {distributor.status === "Pending" && (
              <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">Approve</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Approve Distributor: {distributor.companyName}</DialogTitle>
                        <DialogDescription>Review the submitted registration details before approving.</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4 max-h-96 overflow-y-auto pr-4">
                        <div className="space-y-1">
                            <Label>Company Name</Label>
                            <Input defaultValue={distributor.companyName} readOnly />
                        </div>
                        <div className="space-y-1">
                            <Label>Owner Name</Label>
                            <Input defaultValue="Muhammad Ali" readOnly />
                        </div>
                         <div className="space-y-1">
                            <Label>Drug License Number</Label>
                            <Input defaultValue="DL-12345-FSD" readOnly />
                        </div>
                         <div className="space-y-1">
                            <Label>NTN Number</Label>
                            <Input defaultValue="9876543-2" readOnly />
                        </div>
                         <div className="space-y-1 col-span-2">
                            <Label>Registered Address</Label>
                            <Input defaultValue="P-1, Susan Road, Faisalabad" readOnly />
                        </div>
                        <div className="space-y-1">
                            <Label>Contact Person</Label>
                            <Input defaultValue="Asif Iqbal" readOnly />
                        </div>
                        <div className="space-y-1">
                            <Label>Contact Phone</Label>
                            <Input defaultValue="+92 300 1234567" readOnly />
                        </div>
                         <div className="col-span-2">
                            <Button variant="link" className="p-0">View Uploaded Drug License</Button><br />
                             <Button variant="link" className="p-0">View Uploaded NTN Certificate</Button>
                        </div>
                    </div>
                     <DialogFooter>
                        <div className="flex items-center space-x-2">
                           <Checkbox id="terms" checked={kycConfirmed} onCheckedChange={(checked) => setKycConfirmed(checked as boolean)} />
                           <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I confirm all KYC details have been reviewed and verified.
                           </label>
                        </div>
                        <Button onClick={() => handleStatusChange('Approved')} disabled={!kycConfirmed}>Confirm & Approve</Button>
                    </DialogFooter>
                </DialogContent>
              </Dialog>
          )}
          {distributor.status === "Approved" && <Button onClick={() => handleStatusChange('Suspended')} size="sm" variant="destructive" className="w-full">Suspend</Button>}
          {distributor.status === "Suspended" && <Button onClick={() => handleStatusChange('Approved')} size="sm" className="w-full">Re-activate</Button>}
        </div>
         <div className="w-full">
            <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="w-full">Change Package</Button>
                </DialogTrigger>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Package for {distributor.companyName}</DialogTitle>
                        <DialogDescription>Current Package: {distributor.package}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="package-select">New Package</Label>
                         <Select onValueChange={(value: Distributor['package']) => handlePackageChange(value)} defaultValue={distributor.package}>
                            <SelectTrigger id="package-select">
                                <SelectValue placeholder="Select a new package" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Starter">Starter</SelectItem>
                                <SelectItem value="Growth">Growth</SelectItem>
                                <SelectItem value="Custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsPackageDialogOpen(false)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </CardFooter>
    </Card>
  )
}

function SuperAdminDashboard() {
  const [distributors, setDistributors] = useState(initialDistributors);

  const handleDistributorUpdate = (id: string, updates: Partial<Distributor>) => {
    setDistributors(currentDistributors => 
      currentDistributors.map(d => d.id === id ? { ...d, ...updates } : d)
    );
  };

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Distributor Management</h1>
            <p className="text-muted-foreground">Manage all distributor accounts on the platform.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {distributors.map(distributor => (
            <DistributorCard key={distributor.id} distributor={distributor} onUpdate={handleDistributorUpdate} />
        ))}
        </div>
    </div>
  );
}


export default function AdminPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <SuperAdminDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

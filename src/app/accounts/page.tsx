
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";


const orderHistory = [
    { id: "ORD-9872", date: "2023-10-22", dueDate: "2023-11-21", amount: 450.00, status: "Paid" },
    { id: "ORD-9869", date: "2023-10-19", dueDate: "2023-11-18", amount: 300.00, status: "Overdue" },
    { id: "ORD-9865", date: "2023-10-15", dueDate: "2023-11-14", amount: 720.00, status: "Paid" },
];

const transactionHistory = [
     { id: "TRN-1234", orderId: "ORD-9872", date: "2023-10-25", method: "Bank Transfer", amount: 450.00 },
     { id: "TRN-1233", orderId: "ORD-9865", date: "2023-10-18", method: "Credit Card", amount: 720.00 },
];

const statusColors: { [key: string]: string } = {
    Paid: "bg-green-100 text-green-800",
    Overdue: "bg-red-100 text-red-800",
}


function LedgerScreen() {
    const creditLimit = 5000;
    const currentBalance = 300.00;
    const creditUsage = (currentBalance / creditLimit) * 100;

  return (
    <div className="space-y-6">
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Financial Ledger</h1>
            <p className="text-muted-foreground">Viewing for: Ali Pharmacy</p>
        </div>

        {creditUsage > 85 && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Credit Alert</AlertTitle>
                <AlertDescription>
                    Credit usage is over 85%. Please settle the outstanding balance soon.
                </AlertDescription>
            </Alert>
        )}

      <Card>
        <CardHeader>
          <CardTitle>Credit Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold text-red-600">${currentBalance.toFixed(2)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-2xl font-bold">${creditLimit.toFixed(2)}</p>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Credit Usage</span>
                    <span>{creditUsage.toFixed(1)}%</span>
                </div>
                <Progress value={creditUsage} />
            </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderHistory.map(order => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.dueDate}</TableCell>
                        <TableCell>${order.amount.toFixed(2)}</TableCell>
                        <TableCell><Badge className={statusColors[order.status]}>{order.status}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactionHistory.map(tx => (
                    <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell>{tx.orderId}</TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.method}</TableCell>
                        <TableCell className="text-right">${tx.amount.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


export default function AccountsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <LedgerScreen />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

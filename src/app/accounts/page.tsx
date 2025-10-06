
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Invoice,
  Transaction,
  AccountSummary
} from "@/lib/types";

const accountSummary: AccountSummary = {
  customerName: "Ali Pharmacy",
  creditLimit: 15000,
  currentBalance: 4820.50,
  aging: {
    current: 2500,
    '30-60': 1500.50,
    '60-90': 820,
    '90+': 0
  }
};

const invoices: Invoice[] = [
    { id: "ORD-9872", date: "2023-10-22", dueDate: "2023-11-21", amount: 450.00, status: "Paid" },
    { id: "ORD-9871", date: "2023-10-21", dueDate: "2023-11-20", amount: 1250.00, status: "Due in 15 days" },
    { id: "ORD-9869", date: "2023-09-19", dueDate: "2023-10-19", amount: 820.00, status: "Overdue by 34 days" },
    { id: "ORD-9865", date: "2023-08-15", dueDate: "2023-09-14", amount: 720.00, status: "Paid" },
];

const transactions: Transaction[] = [
     { id: "TRN-1234", date: "2023-10-25", description: "Payment for ORD-9872", type: 'Payment', credit: 450.00, runningBalance: 4370.50 },
     { id: "CN-0012", date: "2023-10-24", description: "Credit Note for Return #RTN-050", type: 'Credit Note', credit: 150.00, runningBalance: 4820.50 },
     { id: "INV-9872", date: "2023-10-22", description: "Invoice ORD-9872", type: 'Invoice', debit: 450.00, runningBalance: 4970.50 },
     { id: "TRN-1233", date: "2023-09-18", description: "Payment for ORD-9865", type: 'Payment', credit: 720.00, runningBalance: 4520.50 },
];

const statusColors: { [key: string]: string } = {
    Paid: "bg-green-100 text-green-800",
    Overdue: "bg-red-100 text-red-800",
}

function AgingBucket({ title, amount }: { title: string, amount: number }) {
  if (amount === 0) return null;
  return (
    <div className="p-3 bg-muted rounded-lg text-center">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-lg font-bold">${amount.toLocaleString()}</p>
    </div>
  )
}

function LedgerScreen() {
    const creditUsage = (accountSummary.currentBalance / accountSummary.creditLimit) * 100;

  return (
    <div className="space-y-6">
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Financial Ledger</h1>
            <p className="text-muted-foreground">Viewing for: {accountSummary.customerName}</p>
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
          <CardTitle>Credit & Aging Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold text-red-600">${accountSummary.currentBalance.toFixed(2)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-2xl font-bold">${accountSummary.creditLimit.toFixed(2)}</p>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Credit Usage</span>
                    <span>{creditUsage.toFixed(1)}%</span>
                </div>
                <Progress value={creditUsage} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <AgingBucket title="Current" amount={accountSummary.aging.current} />
              <AgingBucket title="30-60 Days" amount={accountSummary.aging['30-60']} />
              <AgingBucket title="60-90 Days" amount={accountSummary.aging['60-90']} />
              <AgingBucket title="90+ Days" amount={accountSummary.aging['90+']} />
            </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Detailed Statement</CardTitle>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                    <TableHead className="text-right">Running Balance</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map(tx => (
                    <TableRow key={tx.id}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell><Badge variant="outline">{tx.type}</Badge></TableCell>
                        <TableCell className="text-right">{tx.debit ? `$${tx.debit.toFixed(2)}` : '-'}</TableCell>
                        <TableCell className="text-right text-green-600">{tx.credit ? `$${tx.credit.toFixed(2)}` : '-'}</TableCell>
                        <TableCell className="text-right font-bold">${tx.runningBalance.toFixed(2)}</TableCell>
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

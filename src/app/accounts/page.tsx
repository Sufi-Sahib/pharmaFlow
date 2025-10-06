
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
import { invoices, transactions, accountSummary } from "@/lib/data";

const statusColors: { [key: string]: string } = {
    Paid: "bg-green-100 text-green-800",
    Overdue: "bg-red-100 text-red-800",
}

function AgingBucket({ title, amount }: { title: string, amount: number }) {
  if (amount === 0) return null;
  return (
    <div className="p-3 bg-muted rounded-lg text-center">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-lg font-bold">PKR {amount.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-red-600">PKR {accountSummary.currentBalance.toFixed(2)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-2xl font-bold">PKR {accountSummary.creditLimit.toFixed(2)}</p>
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
                        <TableCell className="text-right">{tx.debit ? `PKR ${tx.debit.toFixed(2)}` : '-'}</TableCell>
                        <TableCell className="text-right text-green-600">{tx.credit ? `PKR ${tx.credit.toFixed(2)}` : '-'}</TableCell>
                        <TableCell className="text-right font-bold">PKR {tx.runningBalance.toFixed(2)}</TableCell>
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

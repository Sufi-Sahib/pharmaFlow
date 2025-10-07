
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { auditLogs } from "@/lib/data";

function AuditHistoryScreen() {
  const statusColors: { [key: string]: string } = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failure: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Audit History</h1>
            <p className="text-muted-foreground">Detailed logs of all system and user actions.</p>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>All recorded events in chronological order.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {auditLogs.map(log => (
                    <TableRow key={log.id}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.role}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell className="text-right">
                          <Badge className={statusColors[log.status]}>{log.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


export default function AuditsPage() {
  // In a real app, you would get the user's role and check permissions
  const userRole = "Manager"; // or "Super Admin"

  if (userRole !== "Super Admin" && userRole !== "Manager") {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <main className="p-4 lg:p-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Access Denied</CardTitle>
                            <CardDescription>You do not have permission to view this page.</CardDescription>
                        </CardHeader>
                    </Card>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          <AuditHistoryScreen />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

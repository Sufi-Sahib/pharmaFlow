
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HelpTooltip } from "@/components/ui/help-tooltip";

const roles = [
    { name: "Super Admin", href: "/admin", description: "Manage distributors and platform settings." },
    { name: "Manager", href: "/manager", description: "Oversee operations, bids, and approvals." },
    { name: "Customer", href: "/customer", description: "Browse products and manage orders." },
    { name: "Booker", href: "/booker", description: "Place new orders for customers." },
    { name: "Delivery", href: "/delivery", description: "View and manage delivery tasks." },
    { name: "Accounts", href: "/accounts", description: "View financial ledger and credit information." },
    { name: "Audit History", href: "/audits", description: "View system audit logs." },
    { name: "Analytics", href: "/analytics", description: "View business intelligence dashboards." },
]

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Welcome to PharmaFlow</CardTitle>
                    <CardDescription>
                        This is a multi-role application. Select a dashboard to view.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                        <Card key={role.name}>
                            <CardHeader className="flex-row items-center justify-between">
                                <div>
                                    <CardTitle>{role.name}</CardTitle>
                                    <CardDescription>{role.description}</CardDescription>
                                </div>
                                <HelpTooltip>
                                    Click the button to navigate to the {role.name} dashboard. This role is responsible for: {role.description}
                                </HelpTooltip>
                            </CardHeader>
                            <CardContent>
                                <Link href={role.href}>
                                    <Button className="w-full">
                                        <span>Go to Dashboard</span>
                                        <ArrowRight className="ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

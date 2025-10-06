import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { statsCards } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{card.value}</div>
            {card.change && (
              <p className="text-xs text-muted-foreground flex items-center">
                <span
                  className={cn(
                    "flex items-center",
                    card.changeType === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {card.changeType === "increase" ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {card.change}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

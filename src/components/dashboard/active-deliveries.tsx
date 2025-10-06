import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { activeDeliveries } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PackageCheck, Truck, AlertTriangle } from "lucide-react";

export function ActiveDeliveries() {
  const statusIcons = {
    Picked: <Truck className="h-4 w-4 text-blue-500" />,
    "On the way": <Truck className="h-4 w-4 text-orange-500" />,
    Delivered: <PackageCheck className="h-4 w-4 text-green-500" />,
    Delayed: <AlertTriangle className="h-4 w-4 text-red-500" />,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Active Deliveries</CardTitle>
        <CardDescription>
          Live overview of ongoing delivery tasks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg overflow-hidden border">
          <Image
            src="https://picsum.photos/seed/map1/1200/300"
            width={1200}
            height={300}
            alt="Map of active deliveries"
            className="w-full object-cover"
            data-ai-hint="map route"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="p-3 rounded-lg border bg-card flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{delivery.orderId}</span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  {statusIcons[delivery.status]}
                  <span>{delivery.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={delivery.driver.avatarUrl} data-ai-hint="person portrait" />
                  <AvatarFallback>
                    {delivery.driver.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {delivery.driver.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Updated {delivery.lastUpdate}
                  </p>
                </div>
              </div>
              <Progress
                value={delivery.progress}
                className={cn(
                  "h-2",
                  delivery.status === "Delivered" &&
                    "[&>div]:bg-green-500",
                  delivery.status === "On the way" &&
                    "[&>div]:bg-orange-500",
                  delivery.status === "Delayed" && "[&>div]:bg-red-500"
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


import type { LucideIcon } from "lucide-react";

export type Distributor = {
  id: string;
  companyName: string;
  logoUrl: string;
  status: "Pending" | "Approved" | "Rejected" | "Suspended";
  package: "Starter" | "Growth" | "Custom";
  joinedDate: string;
  bookers: { current: number; max: number };
  deliveryStaff: { current: number; max: number };
  currentSales: number;
};

export type Bid = {
  id: string;
  product: {
    name: string;
    imageUrl: string;
    sku: string;
  };
  customer: {
    name: string;
    avatarUrl: string;
  };
  requestedPrice: number;
  quantity: number;
  status: "Requested" | "Countered" | "Accepted" | "Expired";
};

export type Delivery = {
  id: string;
  orderId: string;
  driver: {
    name: string;
    avatarUrl: string;
  };
  status: "Picked" | "On the way" | "Delivered" | "Delayed";
  lastUpdate: string;
  progress: number;
};

export type StatCard = {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: LucideIcon;
};

import type { Distributor, Bid, Delivery, StatCard } from "@/lib/types";
import { Users, Package, Clock, BarChart, PackageCheck, AlertTriangle } from "lucide-react";

export const statsCards: StatCard[] = [
  {
    title: "Pending Distributors",
    value: "3",
    change: "+2",
    changeType: "increase",
    icon: Users,
  },
  {
    title: "Active Packages",
    value: "128",
    change: "+12",
    changeType: "increase",
    icon: Package,
  },
  {
    title: "Avg. Bid Response",
    value: "12m 45s",
    change: "-1m 30s",
    changeType: "decrease",
    icon: Clock,
  },
  {
    title: "Platform Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "increase",
    icon: BarChart,
  },
];

export const distributors: Distributor[] = [
  {
    id: "dist-01",
    companyName: "MediSupply Co.",
    logoUrl: "https://picsum.photos/seed/logo1/100/100",
    status: "Pending",
    package: "Growth",
    joinedDate: "2023-10-15",
  },
  {
    id: "dist-02",
    companyName: "PharmaCare Inc.",
    logoUrl: "https://picsum.photos/seed/logo2/100/100",
    status: "Approved",
    package: "Custom",
    joinedDate: "2023-01-20",
  },
  {
    id: "dist-03",
    companyName: "HealthLogistics",
    logoUrl: "https://picsum.photos/seed/logo3/100/100",
    status: "Approved",
    package: "Starter",
    joinedDate: "2023-09-01",
  },
  {
    id: "dist-04",
    companyName: "WellPack Pharma",
    logoUrl: "https://picsum.photos/seed/logo4/100/100",
    status: "Pending",
    package: "Starter",
    joinedDate: "2023-10-18",
  },
];

export const sampleBid: Bid = {
  id: "bid-01",
  product: {
    name: "Amlodipine 5mg",
    imageUrl: "https://picsum.photos/seed/product1/200/200",
    sku: "AML-5MG-T30",
  },
  customer: {
    name: "City Clinic",
    avatarUrl: "https://picsum.photos/seed/avatar1/100/100",
  },
  requestedPrice: 18.50,
  quantity: 500,
  status: "Requested",
};

export const activeDeliveries: Delivery[] = [
  {
    id: "del-01",
    orderId: "ORD-9872",
    driver: {
      name: "Ali Khan",
      avatarUrl: "https://picsum.photos/seed/avatar2/100/100",
    },
    status: "On the way",
    lastUpdate: "3m ago",
    progress: 75,
  },
  {
    id: "del-02",
    orderId: "ORD-9871",
    driver: {
      name: "Fatima Ahmed",
      avatarUrl: "https://picsum.photos/seed/avatar3/100/100",
    },
    status: "Picked",
    lastUpdate: "15m ago",
    progress: 20,
  },
  {
    id: "del-03",
    orderId: "ORD-9870",
    driver: {
      name: "Zainab Mir",
      avatarUrl: "https://picsum.photos/seed/avatar4/100/100",
    },
    status: "Delivered",
    lastUpdate: "1h ago",
    progress: 100,
  },
];

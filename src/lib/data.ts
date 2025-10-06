
import type { Distributor, Bid, Delivery, StatCard, Product, ProductBatch, SalesReturn } from "@/lib/types";
import { Users, Package, Clock, BarChart } from "lucide-react";

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
    bookers: { current: 4, max: 5 },
    deliveryStaff: { current: 8, max: 10 },
    currentSales: 75000,
  },
  {
    id: "dist-02",
    companyName: "PharmaCare Inc.",
    logoUrl: "https://picsum.photos/seed/logo2/100/100",
    status: "Approved",
    package: "Custom",
    joinedDate: "2023-01-20",
    bookers: { current: 10, max: 10 },
    deliveryStaff: { current: 18, max: 20 },
    currentSales: 250000,
  },
  {
    id: "dist-03",
    companyName: "HealthLogistics",
    logoUrl: "https://picsum.photos/seed/logo3/100/100",
    status: "Approved",
    package: "Starter",
    joinedDate: "2023-09-01",
    bookers: { current: 1, max: 2 },
    deliveryStaff: { current: 3, max: 3 },
    currentSales: 22000,
  },
  {
    id: "dist-04",
    companyName: "WellPack Pharma",
    logoUrl: "https://picsum.photos/seed/logo4/100/100",
    status: "Suspended",
    package: "Starter",
    joinedDate: "2023-10-18",
    bookers: { current: 2, max: 2 },
    deliveryStaff: { current: 1, max: 3 },
    currentSales: 15000,
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
    itemsCount: 5,
    amount: 1250.00,
    customer: "Wellness Pharmacy",
    address: "456 Oak Ave"
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
    itemsCount: 3,
    amount: 300.00,
    customer: "City Clinic",
    address: "123 Main St",
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
    itemsCount: 8,
    amount: 620.00,
    customer: "Southside Meds",
    address: "321 Elm St"
  },
];

export const customers = [
    { name: "City Clinic", address: "123 Main St", status: "Order Taken" },
    { name: "Wellness Pharmacy", address: "456 Oak Ave", status: "Pending" },
    { name: "HealthFirst Meds", address: "789 Pine Ln", status: "Pending" },
];

export const productsWithBatches: Product[] = [
    {
        name: "Amlodipine 5mg",
        category: "Cardiovascular",
        imageUrl: "https://picsum.photos/seed/product1/200/200",
        price: 20.00,
        inStock: true,
        stock: 250,
        batches: [
            { batchNumber: "A123", expiryDate: "2024-12-31", stock: 100 },
            { batchNumber: "A124", expiryDate: "2025-06-30", stock: 150 }
        ]
    },
    {
        name: "Metformin 500mg",
        category: "Diabetes",
        imageUrl: "https://picsum.photos/seed/product2/200/200",
        price: 15.75,
        inStock: true,
        stock: 80,
        batches: [
            { batchNumber: "M456", expiryDate: "2024-08-31", stock: 80 }
        ]
    },
    {
        name: "Atorvastatin 20mg",
        category: "Cardiovascular",
        imageUrl: "https://picsum.photos/seed/product3/200/200",
        price: 35.50,
        inStock: false,
        stock: 0,
        batches: []
    },
];

export const salesReturns: SalesReturn[] = [
  { id: "RTN-051", customer: "City Clinic", date: "2023-10-23", invoiceId: "INV-9872", amount: 150.00, status: "Pending" },
  { id: "RTN-050", customer: "Wellness Pharmacy", date: "2023-10-21", invoiceId: "INV-9871", amount: 75.50, status: "Approved" },
];

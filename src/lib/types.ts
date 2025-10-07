
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
  status: "Pending" | "Picked" | "On the way" | "Delivered" | "Delayed";
  lastUpdate: string;
  progress: number;
  itemsCount: number;
  amount: number;
  customer: string;
  address: string;
};

export type StatCard = {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: LucideIcon;
};

export type ProductBatch = {
  batchNumber: string;
  expiryDate: string;
  stock: number;
}

export type Product = {
  name: string;
  category: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
  stock: number;
  batches: ProductBatch[];
};

export type SalesReturn = {
  id: string;
  customer: string;
  date: string;
  invoiceId: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
}

export type AccountSummary = {
  customerName: string;
  creditLimit: number;
  currentBalance: number;
  aging: {
    current: number;
    '30-60': number;
    '60-90': number;
    '90+': number;
  }
}

export type Invoice = {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Due in 15 days" | "Overdue by 34 days";
}

export type Transaction = {
  id: string;
  date: string;
  description: string;
  type: "Invoice" | "Payment" | "Credit Note";
  debit?: number;
  credit?: number;
  runningBalance: number;
}

export type AuditLog = {
    id: string;
    timestamp: string;
    user: string;
    role: "Super Admin" | "Manager" | "Customer" | "Booker" | "Delivery";
    action: string;
    details: string;
    status: "Success" | "Failure" | "Pending";
}

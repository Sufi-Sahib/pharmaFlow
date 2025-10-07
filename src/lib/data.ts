
import type { Distributor, Bid, Delivery, StatCard, Product, ProductBatch, SalesReturn, AccountSummary, Invoice, Transaction, AuditLog } from "@/lib/types";
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
    value: "PKR 45,231,890",
    change: "+20.1%",
    changeType: "increase",
    icon: BarChart,
  },
];

export const distributors: Distributor[] = [
  {
    id: "dist-01",
    companyName: "Faisalabad Medical Supplies",
    logoUrl: "https://picsum.photos/seed/logo1/100/100",
    status: "Pending",
    package: "Growth",
    joinedDate: "2023-10-15",
    bookers: { current: 4, max: 5 },
    deliveryStaff: { current: 8, max: 10 },
    currentSales: 7500000,
  },
  {
    id: "dist-02",
    companyName: "Lahore Pharma Group",
    logoUrl: "https://picsum.photos/seed/logo2/100/100",
    status: "Approved",
    package: "Custom",
    joinedDate: "2023-01-20",
    bookers: { current: 10, max: 10 },
    deliveryStaff: { current: 18, max: 20 },
    currentSales: 25000000,
  },
  {
    id: "dist-03",
    companyName: "Kamalia Health Logistics",
    logoUrl: "https://picsum.photos/seed/logo3/100/100",
    status: "Approved",
    package: "Starter",
    joinedDate: "2023-09-01",
    bookers: { current: 1, max: 2 },
    deliveryStaff: { current: 3, max: 3 },
    currentSales: 2200000,
  },
  {
    id: "dist-04",
    companyName: "Gojra WellPack Pharma",
    logoUrl: "https://picsum.photos/seed/logo4/100/100",
    status: "Suspended",
    package: "Starter",
    joinedDate: "2023-10-18",
    bookers: { current: 2, max: 2 },
    deliveryStaff: { current: 1, max: 3 },
    currentSales: 1500000,
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
    name: "Ali Clinic, TTS-City",
    avatarUrl: "https://picsum.photos/seed/avatar1/100/100",
  },
  requestedPrice: 1850,
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
    amount: 125000,
    customer: "Wellness Pharmacy",
    address: "TTS-Jhang Road"
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
    amount: 30000,
    customer: "City Clinic",
    address: "TTS-Gojara Road",
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
    amount: 62000,
    customer: "Southside Meds",
    address: "TTS-Shorkot Road"
  },
];

export const customers = [
    { name: "Ali Clinic", address: "TTS-City", status: "Order Taken" },
    { name: "Chenab Pharmacy", address: "Jhang", status: "Pending" },
    { name: "Shorkot Medicos", address: "Shorkot Cantt", status: "Pending" },
    { name: "Kamalia Dispensary", address: "Kamalia", status: "Pending" },
    { name: "Gojra Medical Store", address: "Gojra", status: "Pending" },
];

export const productsWithBatches: Product[] = [
    {
        name: "Amlodipine 5mg",
        category: "Cardiovascular",
        imageUrl: "https://picsum.photos/seed/product1/200/200",
        price: 2000,
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
        price: 1575,
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
        price: 3550,
        inStock: false,
        stock: 0,
        batches: []
    },
];

export const salesReturns: SalesReturn[] = [
  { id: "RTN-051", customer: "Ali Clinic", date: "2023-10-23", invoiceId: "INV-9872", amount: 15000, status: "Pending" },
  { id: "RTN-050", customer: "Chenab Pharmacy", date: "2023-10-21", invoiceId: "INV-9871", amount: 7550, status: "Approved" },
];

export const accountSummary: AccountSummary = {
  customerName: "National Hospital, Faisalabad",
  creditLimit: 15000000,
  currentBalance: 4820500,
  aging: {
    current: 2500000,
    '30-60': 1500500,
    '60-90': 820000,
    '90+': 0
  }
};

export const invoices: Invoice[] = [
    { id: "ORD-9872", date: "2023-10-22", dueDate: "2023-11-21", amount: 450000.00, status: "Paid" },
    { id: "ORD-9871", date: "2023-10-21", dueDate: "2023-11-20", amount: 1250000.00, status: "Due in 15 days" },
    { id: "ORD-9869", date: "2023-09-19", dueDate: "2023-10-19", amount: 820000.00, status: "Overdue by 34 days" },
    { id: "ORD-9865", date: "2023-08-15", dueDate: "2023-09-14", amount: 720000.00, status: "Paid" },
];

export const transactions: Transaction[] = [
     { id: "TRN-1234", date: "2023-10-25", description: "Payment for ORD-9872", type: 'Payment', credit: 450000, runningBalance: 4370500 },
     { id: "CN-0012", date: "2023-10-24", description: "Credit Note for Return #RTN-050", type: 'Credit Note', credit: 150000, runningBalance: 4820500 },
     { id: "INV-9872", date: "2023-10-22", description: "Invoice ORD-9872", type: 'Invoice', debit: 450000, runningBalance: 4970500 },
     { id: "TRN-1233", date: "2023-09-18", description: "Payment for ORD-9865", type: 'Payment', credit: 720000, runningBalance: 4520500 },
     { id: "INV-9880", date: "2023-11-01", description: "Invoice ORD-9880", type: 'Invoice', debit: 10000000, runningBalance: 14520500 },
     { id: "INV-9881", date: "2023-11-02", description: "Invoice ORD-9881", type: 'Invoice', debit: 15000000, runningBalance: 29520500 },
];


export const auditLogs: AuditLog[] = [
    { id: '1', timestamp: '2023-10-26 10:00:00', user: 'Ali Khan', role: 'Booker', action: 'Order Placed', details: 'Order #12345 placed for Customer XYZ', status: 'Success' },
    { id: '2', timestamp: '2023-10-26 10:05:00', user: 'Fatima Ahmed', role: 'Manager', action: 'Bid Approved', details: 'Bid for Product ABC approved for Customer QRS', status: 'Success' },
    { id: '3', timestamp: '2023-10-26 10:10:00', user: 'Zainab Mir', role: 'Delivery', action: 'Delivery Update', details: 'Delivery #6789 marked as "On the way"', status: 'Pending' },
    { id: '4', timestamp: '2023-10-26 10:15:00', user: 'Kamran', role: 'Super Admin', action: 'Distributor Added', details: 'New distributor "Pharma Solutions" added', status: 'Success' },
    { id: '5', timestamp: '2023-10-26 10:20:00', user: 'Ali Clinic', role: 'Customer', action: 'Sales Return Request', details: 'Sales return requested for Invoice #INV-9872', status: 'Pending' },
];



import type { Distributor, Bid, Delivery, StatCard, Product, ProductBatch, SalesReturn, AccountSummary, Invoice, Transaction, AuditLog, AnalyticsData, SalesTeamMember, Order } from "@/lib/types";
import { Users, Package, Clock, BarChart } from "lucide-react";

export type TimeFrame = '7d' | '30d' | '1y';

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

export const bids: Bid[] = [
    {
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
    },
     {
      id: "bid-02",
      product: {
        name: "Metformin 500mg",
        imageUrl: "https://picsum.photos/seed/product2/200/200",
        sku: "MET-500-T30",
      },
      customer: {
        name: "National Hospital",
        avatarUrl: "https://picsum.photos/seed/avatar5/100/100",
      },
      requestedPrice: 1500,
      quantity: 1000,
      status: "Requested",
    },
    {
      id: "bid-03",
      product: {
        name: "Panadol 500mg",
        imageUrl: "https://picsum.photos/seed/product4/200/200",
        sku: "PAN-500-T100",
      },
      customer: {
        name: "Chenab Pharmacy",
        avatarUrl: "https://picsum.photos/seed/avatar6/100/100",
      },
      requestedPrice: 480,
      quantity: 2000,
      status: "Countered",
    }
];

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
    { name: "Ali Clinic", address: "TTS-City", status: "Order Taken", latitude: 30.77, longitude: 72.48 },
    { name: "Chenab Pharmacy", address: "Jhang", status: "Pending", latitude: 31.27, longitude: 72.33 },
    { name: "Shorkot Medicos", address: "Shorkot Cantt", status: "Pending", latitude: 30.85, longitude: 72.11 },
    { name: "Kamalia Dispensary", address: "Kamalia", status: "Pending", latitude: 30.72, longitude: 72.64 },
    { name: "Gojra Medical Store", address: "Gojra", status: "Pending", latitude: 31.15, longitude: 72.68 },
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
        ],
        lastOrder: {
            quantity: 50,
            date: "2023-09-15",
            price: 1950,
        }
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
        batches: [],
        lastOrder: {
            quantity: 100,
            date: "2023-08-20",
            price: 3500,
        }
    },
    {
        name: "Panadol 500mg",
        category: "Painkiller",
        imageUrl: "https://picsum.photos/seed/product4/200/200",
        price: 500,
        inStock: true,
        stock: 1000,
        batches: [
             { batchNumber: "P789", expiryDate: "2025-10-31", stock: 1000 }
        ]
    },
];

export const productRequests = [
    { id: 'req-1', productName: 'Lisinopril 10mg', customer: 'National Hospital', quantity: 500 },
    { id: 'req-2', productName: 'Omeprazole 20mg', customer: 'Ali Clinic', quantity: 1000 },
    { id: 'req-3', productName: 'Simvastatin 40mg', customer: 'Chenab Pharmacy', quantity: 300 },
];

export const topSellingProducts = [
    { name: "Amlodipine 5mg", imageUrl: "https://picsum.photos/seed/product1/200/200", unitsSold: 450, revenue: 900000 },
    { name: "Metformin 500mg", imageUrl: "https://picsum.photos/seed/product2/200/200", unitsSold: 600, revenue: 945000 },
    { name: "Panadol 500mg", imageUrl: "https://picsum.photos/seed/product4/200/200", unitsSold: 1200, revenue: 600000 },
];


export const salesReturns: SalesReturn[] = [
  { id: "RTN-051", customer: "Ali Clinic", date: "2023-10-23", invoiceId: "INV-9872", amount: 15000, status: "Pending" },
  { id: "RTN-050", customer: "Chenab Pharmacy", date: "2023-10-21", invoiceId: "INV-9871", amount: 7550, status: "Approved" },
];

export const salesTeam: SalesTeamMember[] = [
  { name: "Ali Khan", target: 1500000, achieved: 1250000 },
  { name: "Fatima Ahmed", target: 2000000, achieved: 2150000 },
];

export const deliveryStaff = [
    { id: 'staff-1', name: 'Zainab Mir' },
    { id: 'staff-2', name: 'Umar Farooq' },
    { id: 'staff-3', name: 'Ayesha Khan' },
];

export const accountSummary: AccountSummary = {
  customerName: "National Hospital, Faisalabad",
  creditLimit: 1500000,
  currentBalance: 482050,
  aging: {
    current: 250000,
    '30-60': 150050,
    '60-90': 82000,
    '90+': 0
  }
};

export const mockInvoices: Invoice[] = [
    { id: "ORD-9872", date: "2023-10-22", dueDate: "2024-09-21", amount: 450000.00, status: "Paid" },
    { id: "ORD-9871", date: "2023-10-21", dueDate: "2024-08-20", amount: 1250000.00, status: "Due in 15 days" },
    { id: "ORD-9869", date: "2023-09-19", dueDate: "2024-06-19", amount: 820000.00, status: "Overdue by 34 days" },
    { id: "ORD-9865", date: "2023-08-15", dueDate: "2023-09-14", amount: 720000.00, status: "Paid" },
];

export const areaOrders = {
    "Faisalabad": [
        { id: "ORD-9872", customer: "Ali Clinic", booker: "Ali Khan", amount: 450000.00, status: "Delivered", items: [] },
        { id: "ORD-9871", customer: "National Hospital", booker: "Fatima Ahmed", amount: 1250000.00, status: "Shipped", items: [] },
    ],
    "Lahore": [
        { id: "ORD-9870", customer: "Lahore General", booker: "Ali Khan", amount: 820000.00, status: "Processing", items: [] },
    ],
    "Gojra": [
        { id: "ORD-9869", customer: "Gojra Medicos", booker: "Fatima Ahmed", amount: 720000.00, status: "Delivered", items: [] },
    ]
}

export const customerOrders = {
    "Ali Clinic": [
        { id: "ORD-9872", customer: "Ali Clinic", booker: "Ali Khan", amount: 450000.00, status: "Delivered", items: [] },
        { id: "ORD-9865", customer: "Ali Clinic", booker: "Ali Khan", amount: 320000.00, status: "Delivered", items: [] },
    ],
    "National Hospital": [
        { id: "ORD-9871", customer: "National Hospital", booker: "Fatima Ahmed", amount: 1250000.00, status: "Shipped", items: [] },
    ]
}

export const bookerOrders = {
    "Ali Khan": [
        { id: "ORD-9872", customer: "Ali Clinic", booker: "Ali Khan", amount: 450000.00, status: "Delivered", items: [] },
        { id: "ORD-9870", customer: "Lahore General", booker: "Ali Khan", amount: 820000.00, status: "Processing", items: [] },
    ],
    "Fatima Ahmed": [
        { id: "ORD-9871", customer: "National Hospital", booker: "Fatima Ahmed", amount: 1250000.00, status: "Shipped", items: [] },
         { id: "ORD-9869", customer: "Gojra Medicos", booker: "Fatima Ahmed", amount: 720000.00, status: "Delivered", items: [] },
    ]
}

export const selectedOrderData = {
    id: "ORD-9872",
    customer: "Ali Clinic",
    booker: "Ali Khan",
    amount: 450000.00,
    status: "Delivered",
    date: "2023-10-22",
    items: [
        { product: "Amlodipine 5mg", quantity: 100, price: 2000, total: 200000 },
        { product: "Metformin 500mg", quantity: 100, price: 1500, total: 150000 },
        { product: "Panadol 500mg", quantity: 200, price: 500, total: 100000 },
    ]
}


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

function createComparativeMetric<T extends number | string>(current: T, previous: T) {
    const isNumber = typeof current === 'number' && typeof previous === 'number';
    let change = 0;
    if (isNumber && previous > 0) {
        change = ((current - previous) / previous) * 100;
    } else if (isNumber && previous === 0 && current > 0) {
        change = 100;
    }
    return {
        current,
        previous,
        change: change.toFixed(1),
        changeType: change >= 0 ? 'increase' : 'decrease',
    } as const;
}

const productPerformance = [
    { name: "Atorvastatin 20mg", value: 125000, previousValue: 110000 },
    { name: "Metformin 500mg", value: 98000, previousValue: 105000 },
    { name: "Amlodipine 5mg", value: 76000, previousValue: 70000 },
    { name: "Rosuvastatin 10mg", value: 65000, previousValue: 68000 },
    { name: "Panadol 500mg", value: 54000, previousValue: 45000 },
    { name: "Ciprofloxacin 500mg", value: 43000, previousValue: 42000 },
];

export const newOrders: Order[] = [
    { id: "ORD-9885", customer: "City Hospital", booker: "Ali Khan", amount: 250000.00, status: "Processing", items: [{product: "Amlodipine 5mg", quantity: 50, price: 2000, total: 100000}, {product: "Metformin 500mg", quantity: 50, price: 1500, total: 75000}] },
    { id: "ORD-9884", customer: "Wellness Pharmacy", booker: "Fatima Ahmed", amount: 75000.00, status: "Processing", items: [{product: "Metformin 500mg", quantity: 50, price: 1500, total: 75000}] },
    { id: "ORD-9883", customer: "Hope Clinic", booker: "Direct", amount: 120000.00, status: "Processing", items: [{product: "Panadol 500mg", quantity: 240, price: 500, total: 120000}] },
    { id: "ORD-9882", customer: "Crescent Medicos", booker: "Ali Khan", amount: 32000.00, status: "Processing", items: [{product: "Amlodipine 5mg", quantity: 16, price: 2000, total: 32000}] },
];


export const adminAnalyticsData = {
    '7d': {
        totalRevenue: createComparativeMetric(890000, 750000),
        totalOrders: createComparativeMetric(120, 110),
        newCustomers: createComparativeMetric(15, 12),
        avgOrderValue: createComparativeMetric(7416, 6818),
        topProductsByRevenue: productPerformance.slice(0, 3).map(p => ({ ...p, value: p.value / 4, previousValue: p.previousValue / 4 })),
        topProductsByVolume: productPerformance.slice(0, 3).map(p => ({ ...p, value: p.value / 500, previousValue: p.previousValue / 500 })),
        promisingNewCustomers: [{ id: "cust-101", name: "New Life Pharmacy", purchases: 2, totalValue: 150000 }],
    },
    '30d': {
        totalRevenue: createComparativeMetric(4500000, 4200000),
        totalOrders: createComparativeMetric(580, 550),
        newCustomers: createComparativeMetric(60, 55),
        avgOrderValue: createComparativeMetric(7758, 7636),
        topProductsByRevenue: productPerformance,
        topProductsByVolume: productPerformance.map(p => ({ ...p, value: Math.round(p.value / 480), previousValue: Math.round(p.previousValue / 480) })),
        promisingNewCustomers: [
            { id: "cust-101", name: "New Life Pharmacy, Lahore", purchases: 5, totalValue: 550000 },
            { id: "cust-102", name: "Hope Hospital, Faisalabad", purchases: 3, totalValue: 1200000 },
        ],
    },
    '1y': {
        totalRevenue: createComparativeMetric(52000000, 48000000),
        totalOrders: createComparativeMetric(7000, 6500),
        newCustomers: createComparativeMetric(500, 450),
        avgOrderValue: createComparativeMetric(7428, 7384),
        topProductsByRevenue: productPerformance.map(p => ({ ...p, value: p.value * 12, previousValue: p.previousValue * 12 })),
        topProductsByVolume: productPerformance.map(p => ({ ...p, value: Math.round(p.value / 450) * 12, previousValue: Math.round(p.previousValue / 450) * 12 })),
        promisingNewCustomers: [
            { id: "cust-101", name: "New Life Pharmacy, Lahore", purchases: 5, totalValue: 550000 },
            { id: "cust-102", name: "Hope Hospital, Faisalabad", purchases: 3, totalValue: 1200000 },
            { id: "cust-103", name: "Care Clinic, Gojra", purchases: 8, totalValue: 320000 },
        ]
    }
}

export const superAdminAnalyticsData = {
    '7d': {
        totalDistributors: createComparativeMetric(128, 125),
        totalRevenue: createComparativeMetric(15000000, 14000000),
        totalOrders: createComparativeMetric(2200, 2100),
        topProductsByRevenue: productPerformance.map(p => ({ ...p, value: p.value * 10, previousValue: p.previousValue * 10 })),
        salesByDistributor: distributors.map(d => ({ name: d.companyName, value: d.currentSales / 52, previousValue: d.currentSales / 52 * 0.9 })),
    },
    '30d': {
        totalDistributors: createComparativeMetric(128, 120),
        totalRevenue: createComparativeMetric(75000000, 72000000),
        totalOrders: createComparativeMetric(11000, 10500),
        topProductsByRevenue: productPerformance.map(p => ({ ...p, value: p.value * 50, previousValue: p.previousValue * 50 })),
        salesByDistributor: distributors.map(d => ({ name: d.companyName, value: d.currentSales, previousValue: d.currentSales * 0.95 })),
    },
    '1y': {
        totalDistributors: createComparativeMetric(128, 100),
        totalRevenue: createComparativeMetric(900000000, 850000000),
        totalOrders: createComparativeMetric(132000, 125000),
        topProductsByRevenue: productPerformance.map(p => ({ ...p, value: p.value * 600, previousValue: p.previousValue * 600 })),
        salesByDistributor: distributors.map(d => ({ name: d.companyName, value: d.currentSales * 12, previousValue: d.currentSales * 12 * 0.9 })),
    }
}

    
# **App Name**: PharmaFlow

## Core Features:

- Super Admin Dashboard: Platform-wide view for super admins to approve distributors, manage packages, and set global policies.
- Distributor Onboarding: Streamlined onboarding process for distributors, including application submission, document upload, and KYC/compliance checks.
- Role-Based Access Control (RBAC): Enforce permissions based on user roles to control access to features and data.
  - Super Admin (Platform): Approves distributor admins & assigns package. Sets global policies (KYC, bidding rules, audit retention). Views platform-wide metrics; no access to tenant data content.
  - Admin (Distributor Owner): Manages catalog, customers, users, routes, credit limits.
  - Manager (optional): Limited admin (pricing approvals, dispatch).
  - Booker: Orders on behalf of assigned customers; route check-in/out.
  - Delivery: Receives tasks, navigates, updates status, records payments.
  - Accountant: Ledgers, receipts, ageing, limit changes (policy-gated).
  - Customer: Portal ordering, bids, invoices, own-ledger view.
- Bidding System: AI-powered system suggesting counter prices. Admins and managers are able to set the price based on rules for bids, and a 'tool' will estimate minimum margin, tier rules, and user roles.
- Offline Ordering and Delivery: Offline capabilities for bookers and delivery personnel to save drafts, capture data, and sync later, with conflict resolution.
- GPS Tracking and Evidence: Automatic capture of latitude/longitude on key actions (check-in/out, order submit, delivery status, payment mark) for accountability and dispute resolution.
- Customer Portal with Bidding: Portal for customers to view catalog with tier pricing and request bids on per-SKU or full-cart basis.

## Style Guidelines:

- Primary color: A professional blue (#2962FF) to represent trust, governance and fairness. It creates a dependable but not cold experience for the user.
- Background color: A light blue (#E0F7FA) to complement the primary blue while offering a clean, unobtrusive background.
- Accent color: A muted purple (#9FA8DA) to offer contrast against the primary and background colors without drawing excessive attention, allowing information to take priority.
- Font pairing: 'Inter' (sans-serif) for headlines and 'PT Sans' (sans-serif) for body text to balance legibility and modern feel.
- Consistent use of line icons from a standard library (e.g., Material Design Icons) for clarity and ease of recognition.
- Use a grid-based layout to provide a structured, consistent, and responsive experience across different screen sizes.
- Subtle transitions and animations for user interactions (e.g., button clicks, form submissions) to provide feedback and a polished feel.
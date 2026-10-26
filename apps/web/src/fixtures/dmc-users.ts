import type { DmcUser } from '../domain/dmc-auth.ts'

// Public fictional identities for local review; never use these for production access.
export const DMC_DEMO_PASSWORD = 'DmcDemo!2026'
export const DMC_DEMO_USERS: DmcUser[] = [
  { id: 'dmc-demo-admin', role: 'admin', name: 'Admin', roleLabel: 'DMC administrator', email: 'admin@dmc.travelos.example', initials: 'AD', scope: 'DMC overview', description: 'Review the whole DMC workspace and sample settings' },
  { id: 'dmc-demo-accounts', role: 'accounts', name: 'Accounts', roleLabel: 'Payments and balances', email: 'accounts@dmc.travelos.example', initials: 'AC', scope: 'DMC Accounts', description: 'Review incoming receipts and balances' },
  { id: 'dmc-demo-sales', role: 'sales', name: 'Sales', roleLabel: 'Queries and quotations', email: 'sales@dmc.travelos.example', initials: 'SA', scope: 'DMC Sales', description: 'Capture agency queries and prepare quote versions' },
  { id: 'dmc-demo-reservations', role: 'reservations', name: 'Reservations', roleLabel: 'Supplier bookings', email: 'reservations@dmc.travelos.example', initials: 'RE', scope: 'DMC Reservations', description: 'Review supplier arrangements and confirmations' },
  { id: 'dmc-demo-operations', role: 'operations', name: 'Operations', roleLabel: 'Trip delivery and vouchers', email: 'operations@dmc.travelos.example', initials: 'OP', scope: 'DMC Operations', description: 'Review booked services and travel handover' },
]


import { ServiceItem, InventoryItem, Appointment, Transaction } from './types';

export const SERVICES: ServiceItem[] = [
  { id: 'm1', name: 'Bridal Makeup', price: 150.00, category: 'Makeup', duration: 90, image: 'https://picsum.photos/seed/bridal/400/400' },
  { id: 'm2', name: 'Evening Glam', price: 85.00, category: 'Makeup', duration: 60, image: 'https://picsum.photos/seed/glam/400/400' },
  { id: 'm3', name: 'Natural Look', price: 55.00, category: 'Makeup', duration: 45, image: 'https://picsum.photos/seed/natural/400/400' },
  { id: 'n1', name: 'Gel Manicure', price: 45.00, category: 'Nails', duration: 45, image: 'https://picsum.photos/seed/gel/400/400' },
  { id: 'n2', name: 'Spa Pedicure', price: 60.00, category: 'Nails', duration: 60, image: 'https://picsum.photos/seed/pedi/400/400' },
  { id: 'n3', name: 'Acrylic Full Set', price: 75.00, category: 'Nails', duration: 90, image: 'https://picsum.photos/seed/acrylic/400/400' },
  { id: 'a1', name: 'Lash Application', price: 20.00, category: 'Add-ons', duration: 15, image: 'https://picsum.photos/seed/lashes/400/400' },
  { id: 'a2', name: 'Intricate Nail Art', price: 25.00, category: 'Add-ons', duration: 30, image: 'https://picsum.photos/seed/nailart/400/400' },
  { id: 'p1', name: 'Cuticle Oil', price: 12.00, category: 'Products', stock: 24, image: 'https://picsum.photos/seed/oil/400/400' },
  { id: 'p2', name: 'Setting Spray', price: 28.00, category: 'Products', stock: 15, image: 'https://picsum.photos/seed/spray/400/400' },
];

export const INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'OPI Gel Polish - Red', currentStock: 12, reorderLevel: 5, unit: 'Bottle' },
  { id: 'i2', name: 'MAC Prep+Prime', currentStock: 8, reorderLevel: 3, unit: 'Unit' },
  { id: 'i3', name: 'Disposable Brushes', currentStock: 450, reorderLevel: 100, unit: 'Pack' },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'app1', customerName: 'Sarah Jenkins', serviceId: 'n1', startTime: '10:00 AM', status: 'Checked-in' },
  { id: 'app2', customerName: 'Emily Rose', serviceId: 'm1', startTime: '11:30 AM', status: 'Scheduled' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2023-10-25', amount: 150.00, type: 'Revenue', description: 'Bridal Makeup' },
  { id: 't2', date: '2023-10-25', amount: -45.00, type: 'Expense', description: 'Supply Restock' },
];

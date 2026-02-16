
export type Category = 'Makeup' | 'Nails' | 'Add-ons' | 'Products';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  duration?: number;
  image: string;
  stock?: number;
}

export interface CartItem extends ServiceItem {
  quantity: number;
}

export interface Appointment {
  id: string;
  customerName: string;
  serviceId: string;
  startTime: string;
  status: 'Scheduled' | 'Checked-in' | 'Completed' | 'Cancelled';
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  reorderLevel: number;
  unit: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'Revenue' | 'Expense';
  description: string;
}

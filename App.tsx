
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import POSScreen from './components/POSScreen';
import AppointmentsScreen from './components/AppointmentsScreen';
import InventoryScreen from './components/InventoryScreen';
import AccountingScreen from './components/AccountingScreen';
import { 
  ServiceItem, 
  CartItem, 
  Appointment, 
  InventoryItem, 
  Transaction 
} from './types';
import { 
  INITIAL_APPOINTMENTS, 
  INVENTORY as INITIAL_INVENTORY, 
  INITIAL_TRANSACTIONS 
} from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // POS Handlers
  const addToCart = useCallback((item: ServiceItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const handleCheckout = useCallback(() => {
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0) * 1.08;
    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: total,
      type: 'Revenue',
      description: `POS Sale: ${cart.map(i => i.name).join(', ')}`,
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    clearCart();
    alert('Transaction Successful!');
  }, [cart, clearCart]);

  // Appointment Handlers
  const checkIn = useCallback((id: string) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'Checked-in' } : app
    ));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'pos':
        return (
          <POSScreen 
            addToCart={addToCart} 
            cart={cart} 
            removeFromCart={removeFromCart} 
            clearCart={clearCart}
            onCheckout={handleCheckout}
          />
        );
      case 'appointments':
        return <AppointmentsScreen appointments={appointments} checkIn={checkIn} />;
      case 'inventory':
        return <InventoryScreen items={inventory} />;
      case 'accounting':
        return <AccountingScreen transactions={transactions} />;
      default:
        return <div>Not found</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
            <div className="hidden md:flex items-center space-x-2 text-slate-400 text-sm">
              <i className="fas fa-chevron-right text-xs"></i>
              <span>Ray Makeup & Nails Dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-bold text-slate-900">Marta Rodriguez</span>
              <span className="text-xs text-pink-600 font-medium">Store Manager</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white shadow-sm flex items-center justify-center text-pink-600 font-bold overflow-hidden">
               <img src="https://picsum.photos/seed/manager/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;


import React, { useState, useMemo } from 'react';
import { SERVICES } from '../constants';
import { ServiceItem, CartItem, Category } from '../types';

interface POSScreenProps {
  addToCart: (item: ServiceItem) => void;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  onCheckout: () => void;
}

const POSScreen: React.FC<POSScreenProps> = ({ addToCart, cart, removeFromCart, clearCart, onCheckout }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const categories: (Category | 'All')[] = ['All', 'Makeup', 'Nails', 'Add-ons', 'Products'];

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return SERVICES;
    return SERVICES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Services Grid */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2">
          {filteredServices.map(service => (
            <button
              key={service.id}
              onClick={() => addToCart(service)}
              className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col text-left group"
            >
              <img src={service.image} alt={service.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h3 className="font-semibold text-slate-800 text-sm md:text-base line-clamp-1">{service.name}</h3>
              <p className="text-pink-600 font-bold mt-1">${service.price.toFixed(2)}</p>
              <div className="mt-2 text-xs text-slate-400 flex justify-between items-center">
                <span>{service.duration ? `${service.duration} min` : 'Unit'}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">Add</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg flex flex-col h-full border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <i className="fas fa-shopping-cart mr-2 text-pink-500"></i>
            Current Order
          </h2>
          <button onClick={clearCart} className="text-slate-400 hover:text-red-500 transition-colors">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <i className="fas fa-receipt text-4xl mb-4 opacity-20"></i>
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-start group">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{item.name}</h4>
                  <p className="text-sm text-slate-400">x{item.quantity} at ${item.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 rounded-b-2xl border-t border-slate-100 space-y-3">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-pink-700 active:scale-[0.98] transition-all disabled:bg-slate-300 disabled:shadow-none mt-4"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSScreen;

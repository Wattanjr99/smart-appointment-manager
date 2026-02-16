
import React from 'react';
import { InventoryItem } from '../types';

interface InventoryScreenProps {
  items: InventoryItem[];
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stock Management</h2>
        <div className="flex space-x-2">
           <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-200">
            <i className="fas fa-file-export mr-2"></i> Export
          </button>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
            Add Stock
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Item Name</th>
              <th className="px-6 py-4 font-semibold text-center">Current Stock</th>
              <th className="px-6 py-4 font-semibold text-center">Unit</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-bold ${item.currentStock <= item.reorderLevel ? 'text-red-600' : 'text-slate-800'}`}>
                    {item.currentStock}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-slate-500">{item.unit}</td>
                <td className="px-6 py-4 text-center">
                  {item.currentStock <= item.reorderLevel ? (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Low Stock</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">In Stock</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-pink-600">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryScreen;

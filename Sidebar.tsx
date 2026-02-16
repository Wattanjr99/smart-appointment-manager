
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'pos', icon: 'fa-cash-register', label: 'POS' },
    { id: 'appointments', icon: 'fa-calendar-check', label: 'Appointments' },
    { id: 'inventory', icon: 'fa-boxes-stacked', label: 'Inventory' },
    { id: 'accounting', icon: 'fa-chart-line', label: 'Accounting' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-slate-900 text-white min-h-screen flex flex-col transition-all duration-300">
      <div className="p-4 md:p-8 mb-6">
        <h1 className="hidden md:block font-serif text-2xl font-bold text-pink-400">Ray <span className="text-white">Makeup</span></h1>
        <div className="md:hidden text-2xl text-center text-pink-400 font-serif">R</div>
      </div>
      
      <nav className="flex-1 px-2 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === item.id 
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-xl md:mr-3 w-8 flex justify-center`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center p-3 text-slate-400 hover:text-white transition-colors">
          <i className="fas fa-sign-out-alt text-xl md:mr-3 w-8 flex justify-center"></i>
          <span className="hidden md:block font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

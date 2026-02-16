
import React, { useEffect, useState } from 'react';
import { Transaction } from '../types';
import { getBusinessInsights } from '../services/gemini';
import { SERVICES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AccountingScreenProps {
  transactions: Transaction[];
}

const AccountingScreen: React.FC<AccountingScreenProps> = ({ transactions }) => {
  const [insights, setInsights] = useState<string>('Analyzing business performance...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      const res = await getBusinessInsights(transactions, SERVICES);
      setInsights(res || "Analysis complete.");
      setIsLoading(false);
    };
    fetchInsights();
  }, [transactions]);

  const totalRevenue = transactions
    .filter(t => t.type === 'Revenue')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const chartData = [
    { name: 'Revenue', value: totalRevenue },
    { name: 'Expenses', value: totalExpenses },
    { name: 'Net Profit', value: totalRevenue - totalExpenses },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-green-500 flex flex-col">
          <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Revenue</span>
          <span className="text-3xl font-bold text-slate-900 mt-2">${totalRevenue.toFixed(2)}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-red-500 flex flex-col">
          <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Expenses</span>
          <span className="text-3xl font-bold text-slate-900 mt-2">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-pink-500 flex flex-col">
          <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Net Profit</span>
          <span className="text-3xl font-bold text-slate-900 mt-2">${(totalRevenue - totalExpenses).toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <i className="fas fa-robot mr-2 text-pink-500"></i>
            AI Business Insights
          </h3>
          <div className="bg-pink-50 rounded-xl p-6 flex-1 italic text-slate-700 leading-relaxed min-h-[200px]">
            {isLoading ? (
               <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="ml-2 text-pink-600 font-medium">Gemini is thinking...</span>
              </div>
            ) : (
              <div className="whitespace-pre-line prose prose-pink">{insights}</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Financial Overview</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#ef4444' : '#ec4899'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingScreen;

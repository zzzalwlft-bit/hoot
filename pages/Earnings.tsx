
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';
import { User } from '../types';

const data = [
  { name: 'السبت', profit: 45 },
  { name: 'الأحد', profit: 120 },
  { name: 'الاثنين', profit: 85 },
  { name: 'الثلاثاء', profit: 190 },
  { name: 'الأربعاء', profit: 145 },
  { name: 'الخميس', profit: 250 },
  { name: 'الجمعة', profit: 320 },
];

const Earnings: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">سجل الأرباح</h1>
        <p className="text-slate-400">تابع نمو استثماراتك وأرباحك اليومية بشكل مفصل.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<DollarSign size={24} />} 
          label="إجمالي الأرباح" 
          value={`$${user.totalEarnings.toLocaleString()}`} 
          color="text-emerald-500"
          trend="+12% هذا الأسبوع"
        />
        <StatCard 
          icon={<PieChart size={24} />} 
          label="أرباح متاحة للسحب" 
          value={`$${user.balance.toLocaleString()}`} 
          color="text-amber-500"
        />
        <StatCard 
          icon={<TrendingUp size={24} />} 
          label="أرباح قيد المعالجة" 
          value={`$125.00`} 
          color="text-blue-500"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-white">مخطط نمو الأرباح</h2>
          <select className="bg-slate-950 border border-slate-800 text-slate-400 text-sm rounded-xl px-4 py-2 outline-none">
            <option>آخر 7 أيام</option>
            <option>آخر 30 يوم</option>
          </select>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorProfit)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">آخر عمليات الأرباح</h2>
          <button className="text-amber-500 text-sm font-bold flex items-center gap-1">
            مشاهدة الكل <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-800/30">
                <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">المصدر</th>
                <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">المبلغ</th>
                <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 text-slate-300 text-sm">2023/10/{(20-i)}</td>
                  <td className="px-6 py-4 font-medium text-white">VIP {i} Daily Profit</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold font-mono">+${(i * 12.5).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-500/20">
                      مكتمل
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string, trend?: string }> = ({ icon, label, value, color, trend }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all group">
    <div className={`w-12 h-12 rounded-2xl ${color.replace('text', 'bg')}/10 flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-slate-400 text-sm mb-1">{label}</p>
    <p className="text-3xl font-black text-white font-mono">{value}</p>
    {trend && (
      <p className="mt-2 text-xs text-emerald-500 font-bold flex items-center gap-1">
        <ArrowUpRight size={14} />
        {trend}
      </p>
    )}
  </div>
);

export default Earnings;

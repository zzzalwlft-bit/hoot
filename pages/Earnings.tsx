
import React from 'react';
import { 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';
import { User } from '../types';

// سيتم تصفير البيانات للرسم البياني للمستخدم الجديد
const data = [
  { name: 'السبت', profit: 0 },
  { name: 'الأحد', profit: 0 },
  { name: 'الاثنين', profit: 0 },
  { name: 'الثلاثاء', profit: 0 },
  { name: 'الأربعاء', profit: 0 },
  { name: 'الخميس', profit: 0 },
  { name: 'الجمعة', profit: 0 },
];

const Earnings: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">محفظة الأرباح</h1>
        <p className="text-slate-400">نظرة شاملة على عوائدك الاستثمارية بالدولار ($).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<DollarSign size={24} />} 
          label="إجمالي الأرباح" 
          value={`$${user.totalEarnings.toLocaleString()}`} 
          color="text-emerald-500"
          trend="+0% هذا الأسبوع"
        />
        <StatCard 
          icon={<PieChart size={24} />} 
          label="الرصيد القابل للسحب" 
          value={`$${user.balance.toFixed(2)}`} 
          color="text-amber-500"
        />
        <StatCard 
          icon={<TrendingUp size={24} />} 
          label="أرباح قيد المراجعة" 
          value={`$0.00`} // تم تصفيرها للمستخدم الجديد
          color="text-blue-500"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-white">تحليل النمو المالي ($)</h2>
          <div className="flex gap-2">
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-3 py-1 rounded-full font-black uppercase">مباشر</span>
          </div>
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
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-xl font-bold text-white">تفاصيل آخر العمليات</h2>
        </div>
        <div className="overflow-x-auto">
          {user.totalEarnings === 0 ? (
            <div className="p-20 text-center">
              <p className="text-slate-500 font-bold">لا توجد عمليات مسجلة حالياً. ابدأ بالاستثمار لتظهر أرباحك هنا.</p>
            </div>
          ) : (
            <table className="w-full text-right">
              <thead>
                <tr className="bg-slate-800/30">
                  <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">التاريخ</th>
                  <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">نوع الباقة</th>
                  <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">المبلغ المضاف</th>
                  <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {/* ستظهر العمليات هنا عند وجودها */}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string, trend?: string }> = ({ icon, label, value, color, trend }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all group relative overflow-hidden">
    <div className={`absolute -right-4 -bottom-4 w-16 h-16 ${color.replace('text', 'bg')}/5 rounded-full blur-xl group-hover:scale-150 transition-transform`}></div>
    <div className={`w-12 h-12 rounded-2xl ${color.replace('text', 'bg')}/10 flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wider">{label}</p>
    <p className="text-2xl font-black text-white font-mono tracking-tighter">{value}</p>
    {trend && (
      <p className="mt-2 text-xs text-emerald-500 font-bold flex items-center gap-1">
        <ArrowUpRight size={14} />
        {trend}
      </p>
    )}
  </div>
);

export default Earnings;

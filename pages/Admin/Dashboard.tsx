
import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  CreditCard, 
  Share2, 
  Activity, 
  Check, 
  X, 
  Edit, 
  Trash2,
  Plus,
  ArrowDownLeft,
  Save
} from 'lucide-react';
import { VIPPackage } from '../../types';

interface AdminDashboardProps {
  packages: VIPPackage[];
  setPackages: React.Dispatch<React.SetStateAction<VIPPackage[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ packages, setPackages }) => {
  const [editingPackage, setEditingPackage] = useState<VIPPackage | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
      setPackages(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEditClick = (pkg: VIPPackage) => {
    setEditingPackage({ ...pkg });
    setIsAddMode(false);
  };

  const handleAddClick = () => {
    setEditingPackage({
      id: Math.max(0, ...packages.map(p => p.id)) + 1,
      name: `VIP ${packages.length + 1}`,
      price: 0,
      dailyProfitPercent: 10,
      durationDays: 30,
      status: 'active'
    });
    setIsAddMode(true);
  };

  const handleSave = () => {
    if (!editingPackage) return;
    
    if (isAddMode) {
      setPackages(prev => [...prev, editingPackage]);
    } else {
      setPackages(prev => prev.map(p => p.id === editingPackage.id ? editingPackage : p));
    }
    setEditingPackage(null);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">لوحة تحكم الإدارة</h1>
          <p className="text-slate-400 text-sm">إدارة المستخدمين، الباقات، والعمليات المالية.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
        >
          <Plus size={20} /> إضافة باقة VIP
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard icon={<Users />} label="إجمالي المستخدمين" value="2,450" color="bg-blue-500" trend="+50 اليوم" />
        <AdminStatCard icon={<Package />} label="إجمالي الاستثمارات" value="$145,200" color="bg-amber-500" trend="+12% نمو" />
        <AdminStatCard icon={<CreditCard />} label="إجمالي السحوبات" value="$62,350" color="bg-emerald-500" trend="-5% هذا الشهر" />
        <AdminStatCard icon={<Share2 />} label="إجمالي الإحالات" value="$18,900" color="bg-purple-500" trend="+8% نمو" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Withdrawals */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-xl font-bold text-white">طلبات السحب المعلقة</h2>
            <span className="bg-amber-500/10 text-amber-500 text-[10px] px-3 py-1 rounded-full font-black uppercase">12 طلب جديد</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="bg-slate-800/30 text-slate-500 uppercase text-[10px] font-black tracking-widest">
                  <th className="px-6 py-4">المستخدم</th>
                  <th className="px-6 py-4">المبلغ</th>
                  <th className="px-6 py-4">الشبكة</th>
                  <th className="px-6 py-4 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">User_{i}99</span>
                        <span className="text-[10px] text-slate-500">user{i}@example.com</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-400 font-mono">${(i * 150).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-amber-500">TRC20</span>
                        <span className="text-[10px] text-slate-600 font-mono">T9yD...xY56P89...</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                          <Check size={16} />
                        </button>
                        <button className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50 text-center">
            <h2 className="text-xl font-bold text-white">آخر الإيداعات</h2>
          </div>
          <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[400px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <ArrowDownLeft size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">إيداع من User_{i}</p>
                    <p className="text-[10px] text-slate-500">منذ {i * 12} دقيقة</p>
                  </div>
                </div>
                <p className="text-emerald-400 font-black font-mono text-sm">+${i * 500}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIP Management Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-2xl font-black text-white">إدارة باقات VIP</h2>
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] text-slate-500 font-bold uppercase">التحكم المباشر</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-slate-800/40 text-slate-500 uppercase text-[10px] font-black tracking-widest">
                <th className="px-8 py-6">الباقة</th>
                <th className="px-8 py-6">السعر</th>
                <th className="px-8 py-6">الربح</th>
                <th className="px-8 py-6">المدة</th>
                <th className="px-8 py-6">الحالة</th>
                <th className="px-8 py-6 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-800/10 transition-colors group">
                  <td className="px-8 py-6 font-black text-white text-lg">{pkg.name}</td>
                  <td className="px-8 py-6 font-mono font-black text-amber-500 text-lg">${pkg.price}</td>
                  <td className="px-8 py-6 text-emerald-400 font-black">{pkg.dailyProfitPercent}% <span className="text-[10px] text-slate-600 font-bold mr-1">/يوم</span></td>
                  <td className="px-8 py-6 text-slate-400 font-bold">{pkg.durationDays} يوم</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase ${pkg.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {pkg.status === 'active' ? 'نشط' : 'معطل'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleEditClick(pkg)}
                        className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl hover:bg-amber-500 hover:text-slate-950 transition-all shadow-lg shadow-amber-500/5"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg.id)}
                        className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-lg p-10 shadow-3xl">
            <h3 className="text-2xl font-black text-white mb-8 text-center flex items-center justify-center gap-3">
              {isAddMode ? <Plus className="text-amber-500" /> : <Edit className="text-amber-500" />}
              {isAddMode ? 'إضافة باقة جديدة' : 'تعديل بيانات الباقة'}
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase mb-2 block mr-1">اسم الباقة</label>
                <input 
                  type="text" 
                  value={editingPackage.name}
                  onChange={e => setEditingPackage({...editingPackage, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:border-amber-500 focus:outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase mb-2 block mr-1">السعر ($)</label>
                  <input 
                    type="number" 
                    value={editingPackage.price}
                    onChange={e => setEditingPackage({...editingPackage, price: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:border-amber-500 focus:outline-none font-mono font-black"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase mb-2 block mr-1">الربح اليومي (%)</label>
                  <input 
                    type="number" 
                    value={editingPackage.dailyProfitPercent}
                    onChange={e => setEditingPackage({...editingPackage, dailyProfitPercent: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:border-amber-500 focus:outline-none font-mono font-black text-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-500 uppercase mb-2 block mr-1">المدة (أيام)</label>
                <input 
                  type="number" 
                  value={editingPackage.durationDays}
                  onChange={e => setEditingPackage({...editingPackage, durationDays: Number(e.target.value)})}
                  className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:border-amber-500 focus:outline-none font-bold"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-amber-500 text-slate-950 font-black py-4 rounded-2xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10"
                >
                  <Save size={20} /> حفظ التعديلات
                </button>
                <button 
                  onClick={() => setEditingPackage(null)}
                  className="flex-1 bg-slate-800 text-slate-300 font-bold py-4 rounded-2xl hover:bg-slate-700 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminStatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string, trend: string }> = ({ icon, label, value, color, trend }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] hover:border-slate-700 transition-all group overflow-hidden relative">
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.08] transition-all`}></div>
    <div className={`w-14 h-14 rounded-[1.25rem] ${color} flex items-center justify-center text-white mb-6 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform`}>
      {/* Added cast to any for icon element to fix TypeScript error by allowing 'size' prop in React.cloneElement */}
      {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
    </div>
    <p className="text-slate-500 text-[10px] mb-1 font-black uppercase tracking-widest">{label}</p>
    <p className="text-3xl font-black text-white font-mono mb-3 tracking-tighter">{value}</p>
    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 bg-emerald-500/5 w-fit px-3 py-1 rounded-full border border-emerald-500/10">
      <Activity size={10} />
      {trend}
    </div>
  </div>
);

export default AdminDashboard;

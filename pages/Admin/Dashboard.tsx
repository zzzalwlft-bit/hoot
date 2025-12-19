
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
  Save,
  ShieldCheck
} from 'lucide-react';
import { VIPPackage } from '../../types.ts';

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
    const nextId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
    setEditingPackage({
      id: nextId,
      name: `VIP ${nextId}`,
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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 p-6 rounded-[2rem] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="text-amber-500" size={24} />
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">لوحة الإدارة</h1>
          </div>
          <p className="text-slate-400 text-sm">تحكم في الباقات وطلبات السحب من هنا.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-amber-400 transition-all active:scale-95"
        >
          <Plus size={20} /> إضافة باقة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard icon={<Users />} label="المستخدمين" value="1,284" color="text-blue-500" />
        <AdminStatCard icon={<Package />} label="إجمالي الباقات" value={packages.length.toString()} color="text-amber-500" />
        <AdminStatCard icon={<CreditCard />} label="طلبات السحب" value="8" color="text-emerald-500" />
        <AdminStatCard icon={<Share2 />} label="الإحالات" value="450" color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Withdrawals List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-slate-800/20">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-amber-500" />
              طلبات سحب معلقة
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase bg-slate-950/50">
                  <th className="px-6 py-4">المستخدم</th>
                  <th className="px-6 py-4">المبلغ</th>
                  <th className="px-6 py-4 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { name: 'Khaled_2', amount: 45.00 },
                  { name: 'Sami_User', amount: 120.50 }
                ].map((req, i) => (
                  <tr key={i} className="hover:bg-slate-800/20">
                    <td className="px-6 py-4 font-bold text-white">{req.name}</td>
                    <td className="px-6 py-4 font-mono text-emerald-400 font-black">${req.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"><Check size={14}/></button>
                      <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><X size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Packages List */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-slate-800/20">
            <h2 className="text-lg font-bold text-white">إدارة الباقات</h2>
          </div>
          <div className="p-4 space-y-3">
            {packages.map(pkg => (
              <div key={pkg.id} className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800 rounded-2xl">
                <div>
                  <p className="text-sm font-black text-white">{pkg.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold">${pkg.price}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEditClick(pkg)} className="p-2 text-slate-400 hover:text-amber-500 transition-all"><Edit size={14}/></button>
                  <button onClick={() => handleDelete(pkg.id)} className="p-2 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {editingPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-6 text-center">
              {isAddMode ? 'إضافة باقة' : 'تعديل باقة'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase mr-1">الاسم</label>
                <input 
                  type="text" 
                  value={editingPackage.name}
                  onChange={e => setEditingPackage({...editingPackage, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:border-amber-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase mr-1">السعر ($)</label>
                  <input 
                    type="number" 
                    value={editingPackage.price}
                    onChange={e => setEditingPackage({...editingPackage, price: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:border-amber-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase mr-1">الربح (%)</label>
                  <input 
                    type="number" 
                    value={editingPackage.dailyProfitPercent}
                    onChange={e => setEditingPackage({...editingPackage, dailyProfitPercent: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={handleSave} className="flex-1 bg-amber-500 text-slate-950 font-black py-4 rounded-2xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2">
                  <Save size={18} /> حفظ
                </button>
                <button onClick={() => setEditingPackage(null)} className="flex-1 bg-slate-800 text-slate-400 font-bold py-4 rounded-2xl hover:bg-slate-700 transition-all">
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

const AdminStatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] hover:border-slate-700 transition-all group">
    <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${color} mb-3 group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase mb-0.5">{label}</p>
    <p className="text-xl font-black text-white font-mono">{value}</p>
  </div>
);

export default AdminDashboard;

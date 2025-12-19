
import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  CreditCard, 
  Check, 
  X, 
  Copy, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Settings,
  Mail,
  History,
  TrendingUp,
  Wallet,
  ArrowLeft,
  QrCode,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { VIPPackage, WithdrawalRequest, SystemSettings, User } from '../../types.ts';

interface AdminDashboardProps {
  packages: VIPPackage[];
  setPackages: React.Dispatch<React.SetStateAction<VIPPackage[]>>;
  systemSettings: SystemSettings;
  setSystemSettings: React.Dispatch<React.SetStateAction<SystemSettings>>;
}

// بيانات تجريبية للمستخدمين وطلبات السحب
const MOCK_USERS: User[] = [
  { id: 'usr-01', username: 'Ahmed_Invest', email: 'ahmed@gmail.com', balance: 450.50, totalEarnings: 1200, referralCode: 'REF123', role: 'user', activePackage: 'VIP 3', referralCount: 12 },
  { id: 'usr-02', username: 'Sami_Pro', email: 'sami@outlook.com', balance: 12.00, totalEarnings: 45, referralCode: 'SAMI99', role: 'user', activePackage: 'VIP 1', referralCount: 2 },
];

const MOCK_WITHDRAWALS: WithdrawalRequest[] = [
  { id: 'WDR-01', userId: 'usr-01', username: 'Ahmed_Invest', amount: 150, network: 'USDT (TRC20)', walletAddress: 'T9yD...xY56P89QwE2z1m5nB0pQ', status: 'pending', date: '2023-11-20' },
  { id: 'WDR-02', userId: 'usr-02', username: 'Sami_Pro', amount: 25, network: 'USDT (BEP20)', walletAddress: '0x71C...3a5f78b9c1d2e3f4a5b6', status: 'pending', date: '2023-11-21' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ packages, setPackages, systemSettings, setSystemSettings }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'withdrawals' | 'settings'>('overview');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(MOCK_WITHDRAWALS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const updateWithdrawalStatus = (id: string, status: 'completed' | 'failed') => {
    if (window.confirm(`هل أنت متأكد من ${status === 'completed' ? 'قبول' : 'رفض'} هذا الطلب؟`)) {
      setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status } : w));
    }
  };

  const updateWalletSetting = (network: string, field: 'address' | 'qrCode', value: string) => {
    setSystemSettings(prev => ({
      ...prev,
      wallets: prev.wallets.map(w => w.network === network ? { ...w, [field]: value } : w)
    }));
  };

  // واجهة عرض تفاصيل المستخدم (صفحة منفصلة وهمية)
  if (selectedUser) {
    return (
      <div className="animate-in slide-in-from-left duration-500 pb-20">
        <button 
          onClick={() => setSelectedUser(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-bold">العودة للوحة التحكم</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
              <div className="w-24 h-24 bg-slate-800 rounded-3xl mx-auto mb-6 flex items-center justify-center text-amber-500 font-black text-3xl shadow-2xl relative z-10">
                {selectedUser.username.charAt(0)}
              </div>
              <h2 className="text-2xl font-black text-white mb-1">{selectedUser.username}</h2>
              <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-6">
                <Mail size={14} />
                <span>{selectedUser.email}</span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 py-2 rounded-xl inline-block px-6">
                <span className="text-amber-500 font-black text-xs uppercase tracking-widest">{selectedUser.activePackage || 'لا توجد باقة'}</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase">كود الإحالة</span>
                <span className="text-white font-mono font-bold">{selectedUser.referralCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase">عدد المحالين</span>
                <span className="text-amber-500 font-black">{selectedUser.referralCount} شخص</span>
              </div>
            </div>
          </div>

          {/* User Stats & History */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                <p className="text-slate-500 text-[10px] font-black uppercase mb-1">الرصيد الحالي</p>
                <p className="text-3xl font-black text-emerald-400 font-mono">${selectedUser.balance.toFixed(2)}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                <p className="text-slate-500 text-[10px] font-black uppercase mb-1">إجمالي الأرباح</p>
                <p className="text-3xl font-black text-white font-mono">${selectedUser.totalEarnings.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
              <div className="p-6 border-b border-slate-800 bg-slate-800/20 flex items-center gap-3">
                <History size={18} className="text-amber-500" />
                <h3 className="font-bold text-white">سجل العمليات الأخير</h3>
              </div>
              <div className="p-20 text-center text-slate-600 font-bold">
                لا توجد عمليات سحب سابقة لهذا المستخدم.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/40 p-6 rounded-[2rem] border border-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/5">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">نظام الإدارة المركزي</h1>
            <p className="text-slate-500 text-xs font-medium">مرحباً بك، لديك كامل الصلاحيات لإدارة المنصة.</p>
          </div>
        </div>
        
        <div className="flex bg-slate-950/50 p-1 rounded-2xl border border-slate-800">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<TrendingUp size={16}/>} label="الرئيسية" />
          <TabButton active={activeTab === 'withdrawals'} onClick={() => setActiveTab('withdrawals')} icon={<CreditCard size={16}/>} label="السحوبات" />
          <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={16}/>} label="الإعدادات" />
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminStatCard icon={<Users />} label="إجمالي المستخدمين" value="1,284" color="text-blue-500" />
            <AdminStatCard icon={<CreditCard />} label="طلبات معلقة" value={withdrawals.filter(w => w.status === 'pending').length.toString()} color="text-amber-500" />
            <AdminStatCard icon={<Package />} label="الباقات النشطة" value="450" color="text-emerald-500" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="font-bold text-white flex items-center gap-2">
                <Users size={18} className="text-amber-500" />
                قائمة المستثمرين
              </h2>
              <span className="text-[10px] text-slate-500 font-bold uppercase">اضغط على الاسم للتفاصيل</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-950/50 text-slate-500 text-[10px] font-black uppercase">
                    <th className="px-6 py-4">المستثمر</th>
                    <th className="px-6 py-4">البريد</th>
                    <th className="px-6 py-4">الرصيد</th>
                    <th className="px-6 py-4">الباقة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {MOCK_USERS.map(user => (
                    <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="font-bold text-white group-hover:text-amber-500 flex items-center gap-2 transition-all"
                        >
                          {user.username}
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{user.email}</td>
                      <td className="px-6 py-4 font-mono font-black text-emerald-400 text-sm">${user.balance.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-800 text-slate-400 text-[10px] px-3 py-1 rounded-lg font-black">{user.activePackage}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'withdrawals' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-800/20 flex justify-between items-center">
              <h2 className="font-bold text-white flex items-center gap-2">
                <CreditCard size={18} className="text-amber-500" />
                طلبات السحب المعلقة
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-950/50 text-slate-500 text-[10px] font-black uppercase">
                    <th className="px-6 py-4">المستخدم</th>
                    <th className="px-6 py-4">المبلغ</th>
                    <th className="px-6 py-4">الشبكة</th>
                    <th className="px-6 py-4">المحفظة</th>
                    <th className="px-6 py-4 text-center">القرار</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {withdrawals.filter(w => w.status === 'pending').map(req => (
                    <tr key={req.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <button onClick={() => setSelectedUser(MOCK_USERS.find(u => u.id === req.userId) || null)} className="font-bold text-white hover:text-amber-500 transition-colors">
                          {req.username}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-mono font-black text-emerald-400 text-lg">${req.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black text-slate-500">{req.network}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="text-[10px] bg-slate-950 p-2 rounded-lg text-slate-400 font-mono">{req.walletAddress.substring(0,10)}...</code>
                          <button 
                            onClick={() => handleCopy(req.walletAddress, req.id)}
                            className={`p-2 rounded-lg transition-all ${copiedId === req.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-amber-500 hover:bg-slate-700'}`}
                          >
                            {copiedId === req.id ? <Check size={14}/> : <Copy size={14}/>}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => updateWithdrawalStatus(req.id, 'completed')}
                            className="bg-emerald-500/10 text-emerald-500 p-2.5 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => updateWithdrawalStatus(req.id, 'failed')}
                            className="bg-red-500/10 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {withdrawals.filter(w => w.status === 'pending').length === 0 && (
                <div className="p-20 text-center text-slate-600 font-bold">لا توجد طلبات سحب حالياً.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-slate-800 bg-slate-800/20 flex items-center gap-3">
              <QrCode size={20} className="text-amber-500" />
              <h2 className="text-lg font-black text-white">إعدادات محافظ الشحن (USDT)</h2>
            </div>
            
            <div className="p-8 space-y-10">
              {systemSettings.wallets.map((wallet) => (
                <div key={wallet.network} className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800 last:border-0 last:pb-0">
                  <div className="lg:col-span-1">
                    <h3 className="text-amber-500 font-black text-lg mb-2">{wallet.network}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">قم بتحديث عنوان الاستقبال ورمز الـ QR لهذه الشبكة.</p>
                  </div>
                  
                  <div className="lg:col-span-3 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                        <Wallet size={12} /> عنوان المحفظة
                      </label>
                      <input 
                        type="text" 
                        value={wallet.address}
                        onChange={(e) => updateWalletSetting(wallet.network, 'address', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl font-mono text-xs focus:border-amber-500 outline-none"
                        placeholder="أدخل عنوان المحفظة هنا..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                        <ImageIcon size={12} /> رابط صورة QR Code
                      </label>
                      <div className="flex gap-4 items-center">
                        <input 
                          type="text" 
                          value={wallet.qrCode}
                          onChange={(e) => updateWalletSetting(wallet.network, 'qrCode', e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl font-mono text-[10px] focus:border-amber-500 outline-none"
                          placeholder="رابط الصورة (URL)..."
                        />
                        <div className="w-14 h-14 bg-white rounded-xl p-1 shrink-0 shadow-xl">
                          <img src={wallet.qrCode} alt="QR Preview" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <button className="bg-amber-500 text-slate-950 font-black px-10 py-4 rounded-2xl hover:bg-amber-400 transition-all flex items-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95">
                  <Save size={20} /> حفظ جميع التغييرات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${active ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
  >
    {icon}
    {label}
  </button>
);

const AdminStatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] group hover:border-slate-700 transition-all">
    <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase mb-1 tracking-widest">{label}</p>
    <p className="text-3xl font-black text-white font-mono tracking-tighter">{value}</p>
  </div>
);

export default AdminDashboard;

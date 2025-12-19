
import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  History, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ShieldCheck 
} from 'lucide-react';
import { User, Transaction } from '../types';
import { MIN_WITHDRAWAL } from '../constants.tsx';

const MOCK_WITHDRAWALS: Transaction[] = [
  { id: 'TX1029', userId: '1', amount: 45.00, type: 'withdraw', status: 'completed', date: '2023-10-15', network: 'TRC20' },
  { id: 'TX1034', userId: '1', amount: 120.00, type: 'withdraw', status: 'pending', date: '2023-10-22', network: 'TRC20' },
  { id: 'TX1011', userId: '1', amount: 25.00, type: 'withdraw', status: 'failed', date: '2023-10-10', network: 'BEP20' },
];

const Withdraw: React.FC<{ user: User, setUser: React.Dispatch<React.SetStateAction<User>> }> = ({ user, setUser }) => {
  const [amount, setAmount] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [network, setNetwork] = useState<string>('TRC20');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount < MIN_WITHDRAWAL) {
      alert(`الحد الأدنى للسحب هو $${MIN_WITHDRAWAL}`);
      return;
    }

    if (withdrawAmount > user.balance) {
      alert("رصيدك غير كافٍ لإتمام هذه العملية.");
      return;
    }

    if (!address.trim()) {
      alert("الرجاء إدخال عنوان المحفظة.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setUser(prev => ({ ...prev, balance: prev.balance - withdrawAmount }));
      setIsSubmitting(false);
      alert("تم تقديم طلب السحب بنجاح. سيتم مراجعته قريباً.");
      setAmount('');
      setAddress('');
    }, 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">سحب الأرباح</h1>
        <p className="text-slate-400">حول أرباحك إلى محفظتك الشخصية بسهولة وأمان.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Withdrawal Form */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
             <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <ArrowUpRight size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">طلب سحب جديد</h2>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 mr-1">الرصيد المتاح</label>
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl font-black text-emerald-500 font-mono text-xl">
                    ${user.balance.toFixed(2)}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 mr-1">طريقة السحب</label>
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl font-bold text-slate-300">
                    USDT (Crypto)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 mr-1">المبلغ المراد سحبه</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`أقل مبلغ $${MIN_WITHDRAWAL}`}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 px-6 rounded-2xl font-bold focus:outline-none focus:border-amber-500 transition-all pr-12"
                  />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 mr-1">شبكة التحويل</label>
                <select 
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 px-6 rounded-2xl font-bold focus:outline-none focus:border-amber-500 appearance-none"
                >
                  <option value="TRC20">USDT (TRC20)</option>
                  <option value="BEP20">USDT (BEP20)</option>
                  <option value="ERC20">USDT (ERC20)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 mr-1">عنوان المحفظة الخاص بك</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ادخل عنوان المحفظة الصحيح"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 px-6 rounded-2xl font-mono text-sm focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl flex gap-3">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  الرجاء التأكد من صحة العنوان والشبكة. أي خطأ في البيانات سيؤدي لضياع المبلغ. تستغرق المراجعة اليدوية من ساعة إلى 24 ساعة كحد أقصى.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${isSubmitting ? 'bg-slate-800 text-slate-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/10'}`}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'تأكيد طلب السحب'}
              </button>
            </form>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">نظام سحب آمن</p>
              <p className="text-xs text-slate-400">جميع عمليات السحب تخضع للمراجعة اليدوية لضمان حماية أموال المستخدمين.</p>
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <History size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">سجل السحوبات</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            {MOCK_WITHDRAWALS.length > 0 ? (
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-800/30">
                    <th className="px-6 py-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">التاريخ</th>
                    <th className="px-6 py-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">المبلغ</th>
                    <th className="px-6 py-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">الشبكة</th>
                    <th className="px-6 py-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {MOCK_WITHDRAWALS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 text-slate-400 text-xs">{tx.date}</td>
                      <td className="px-6 py-4 text-white font-bold font-mono">${tx.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{tx.network}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={tx.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                <History className="text-slate-800 mb-4" size={64} />
                <p className="text-slate-500">لا توجد عمليات سحب سابقة لعرضها.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-500/20">
          <CheckCircle2 size={12} /> مكتمل
        </span>
      );
    case 'pending':
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full border border-amber-500/20">
          <Clock size={12} /> قيد المراجعة
        </span>
      );
    case 'failed':
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold rounded-full border border-red-500/20">
          <XCircle size={12} /> مرفوض
        </span>
      );
    default:
      return null;
  }
};

export default Withdraw;


import React, { useState } from 'react';
import { Copy, Users, Trophy, Gift, Check, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { User, Referral as ReferralType } from '../types';

const MOCK_REFERRALS: ReferralType[] = [
  { id: '1', name: 'أحمد محمد', earnings: 45.5, status: 'Active', dateJoined: '2023-10-15' },
  { id: '2', name: 'سارة خالد', earnings: 12.0, status: 'Active', dateJoined: '2023-10-18' },
  { id: '3', name: 'يوسف علي', earnings: 0, status: 'Inactive', dateJoined: '2023-10-20' },
  { id: '4', name: 'منى حسن', earnings: 89.2, status: 'Active', dateJoined: '2023-10-22' },
];

const Referral: React.FC<{ user: User }> = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://proinvest.com/join?ref=${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">نظام الإحالة</h1>
          <p className="text-slate-400">شارك رابط الإحالة الخاص بك واحصل على عمولات مجزية من استثمارات أصدقائك.</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-2xl">
          <p className="text-xs text-amber-500 font-bold mb-1">نسبة العمولة</p>
          <p className="text-xl font-black text-white">15% <span className="text-sm font-normal text-slate-400 mr-1">من الأرباح</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Referral Link Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-amber-500 to-amber-600"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <LinkIcon size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">رابط الإحالة الخاص بك</h2>
            </div>
            
            <div className="relative group">
              <input 
                type="text" 
                readOnly 
                value={referralLink}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 py-5 px-6 rounded-2xl font-medium focus:outline-none focus:border-amber-500/50 transition-all pr-12"
              />
              <button 
                onClick={handleCopy}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/10 flex items-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'تم النسخ' : 'نسخ الرابط'}
              </button>
            </div>
          </div>

          {/* Referral Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">الأشخاص المحالين</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-800/30">
                    <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase">الاسم</th>
                    <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase">تاريخ الانضمام</th>
                    <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase">الأرباح المولدة</th>
                    <th className="px-6 py-4 text-slate-400 text-xs font-bold uppercase">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {MOCK_REFERRALS.map((ref) => (
                    <tr key={ref.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                          {ref.name.charAt(0)}
                        </div>
                        {ref.name}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{ref.dateJoined}</td>
                      <td className="px-6 py-4 text-emerald-400 font-bold font-mono">+${ref.earnings.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full border ${
                          ref.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                        }`}>
                          {ref.status === 'Active' ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8 rounded-3xl">
            <Trophy className="text-amber-500 mb-6" size={40} />
            <h3 className="text-xl font-bold text-white mb-2">لوحة الشرف</h3>
            <p className="text-slate-400 text-sm mb-6">أكثر المستخدمين ربحاً من خلال نظام الإحالة هذا الشهر.</p>
            <div className="space-y-4">
              {[
                { name: 'user_99', amount: '$4,200' },
                { name: 'cryptoking', amount: '$3,850' },
                { name: 'investor_X', amount: '$2,100' }
              ].map((top, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-300 font-medium">{idx + 1}. {top.name}</span>
                  <span className="text-amber-500 font-black">{top.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl">
            <Gift className="text-emerald-500 mb-4" size={32} />
            <h3 className="text-lg font-bold text-white mb-1">مكافأة خاصة</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              عند دعوة 10 مستخدمين نشطين، تحصل على باقة <span className="text-amber-500 font-bold">VIP 1 مجانية</span> لمدة شهر كامل.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;

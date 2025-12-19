
import React, { useState, useEffect } from 'react';
import { Copy, Check, Info, AlertTriangle, QrCode, DollarSign } from 'lucide-react';
import { SystemSettings } from '../types.ts';

const Deposit: React.FC<{ systemSettings: SystemSettings }> = ({ systemSettings }) => {
  const [selectedWallet, setSelectedWallet] = useState(systemSettings.wallets[0]);
  const [amount, setAmount] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // تحديث المحفظة المختارة إذا قام الأدمن بتغييرها
    const updated = systemSettings.wallets.find(w => w.network === selectedWallet.network);
    if (updated) setSelectedWallet(updated);
  }, [systemSettings, selectedWallet.network]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert("الرجاء إدخال مبلغ صحيح للشحن.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("تم تسجيل طلب الإيداع. سيتم إضافة الرصيد تلقائياً بعد تأكيدات الشبكة.");
      setAmount('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">تعبئة المحفظة</h1>
        <p className="text-slate-400">استخدم العناوين المحدثة أدناه لشحن حسابك.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <p className="text-sm font-semibold text-slate-300 mb-2 mr-1">1. اختر الشبكة</p>
          {systemSettings.wallets.map((wallet) => (
            <button
              key={wallet.network}
              onClick={() => setSelectedWallet(wallet)}
              className={`
                w-full p-4 rounded-2xl flex items-center justify-between border transition-all
                ${selectedWallet.network === wallet.network 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold shadow-lg shadow-amber-500/5' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] ${selectedWallet.network === wallet.network ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}>
                  {wallet.network.includes('TRC20') ? 'TRX' : wallet.network.includes('BEP20') ? 'BSC' : 'ETH'}
                </div>
                <span>{wallet.network}</span>
              </div>
              {selectedWallet.network === wallet.network && <Check size={18} />}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 mr-1">2. حدد المبلغ المراد شحنه ($)</label>
              <div className="relative">
                <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-950 border border-slate-800 text-white py-4 pr-12 pl-4 rounded-2xl font-black text-xl focus:outline-none focus:border-amber-500 transition-all font-mono"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-4 mr-1">3. امسح الرمز أو انسخ العنوان</label>
              <div className="inline-block bg-white p-3 rounded-2xl mb-6 shadow-2xl">
                <img src={selectedWallet.qrCode} alt="QR Code" className="w-40 h-40" />
              </div>

              <div className="relative mb-6 text-right">
                <input 
                  type="text" 
                  readOnly 
                  value={selectedWallet.address}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-400 py-4 pr-4 pl-24 rounded-2xl font-mono text-[10px] focus:outline-none"
                />
                <button 
                  type="button"
                  onClick={handleCopy}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-amber-500 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-slate-700"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'تم' : 'نسخ'}
                </button>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex gap-4">
              <div className="text-amber-500 shrink-0"><AlertTriangle size={24} /></div>
              <div className="text-right">
                <p className="text-amber-500 font-bold text-sm mb-1">تنبيه هام</p>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  أرسل فقط <strong>USDT</strong> عبر شبكة <strong>{selectedWallet.network}</strong>. أي خطأ في الشبكة سيؤدي لضياع أموالك.
                </p>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'bg-slate-800 text-slate-600' : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/10 active:scale-[0.98]'}`}
            >
              {isSubmitting ? <div className="w-6 h-6 border-4 border-slate-950 border-t-transparent rounded-full animate-spin"></div> : 'أكدتُ عملية الإرسال'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;

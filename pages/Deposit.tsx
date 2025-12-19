
import React, { useState } from 'react';
import { Copy, Check, Info, AlertTriangle, QrCode, DollarSign } from 'lucide-react';
import { CRYPTO_NETWORKS } from '../constants.tsx';

const Deposit: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(CRYPTO_NETWORKS[0]);
  const [amount, setAmount] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedNetwork.address);
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
    // محاكاة عملية معالجة الإيداع
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
        <p className="text-slate-400">قم بشحن حسابك باستخدام العملات الرقمية لبدء الاستثمار بالدولار.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Selection */}
        <div className="lg:col-span-1 space-y-4">
          <p className="text-sm font-semibold text-slate-300 mb-2 mr-1">1. اختر الشبكة</p>
          {CRYPTO_NETWORKS.map((net) => (
            <button
              key={net.name}
              onClick={() => setSelectedNetwork(net)}
              className={`
                w-full p-4 rounded-2xl flex items-center justify-between border transition-all
                ${selectedNetwork.name === net.name 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${selectedNetwork.name === net.name ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}>
                  {net.icon}
                </div>
                <span>{net.name}</span>
              </div>
              {selectedNetwork.name === net.name && <Check size={18} />}
            </button>
          ))}
        </div>

        {/* Deposit Details Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Amount Input */}
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

            {/* Address and QR Section */}
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-4 mr-1">3. أرسل المبلغ إلى هذا العنوان</label>
              
              <div className="flex flex-col items-center mb-6">
                <div className="bg-white p-3 rounded-2xl mb-4 shadow-xl">
                  <QrCode size={140} className="text-slate-900" />
                </div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">عنوان محفظة {selectedNetwork.name}</p>
              </div>

              <div className="relative mb-6">
                <input 
                  type="text" 
                  readOnly 
                  value={selectedNetwork.address}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-400 py-4 pr-4 pl-24 rounded-2xl font-mono text-xs focus:outline-none"
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

            {/* Warning Message */}
            <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex gap-4">
              <div className="text-amber-500 shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-amber-500 font-bold text-sm mb-1">تحذير الشبكة</p>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  يجب أن يتم التحويل عبر شبكة <strong>{selectedNetwork.name}</strong> حصراً. إرسال مبلغ عبر شبكة مختلفة سيؤدي لفقدان أموالك.
                </p>
              </div>
            </div>

            {/* Confirm Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3
                ${isSubmitting 
                  ? 'bg-slate-800 text-slate-600' 
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 active:scale-[0.98]'}
              `}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'أكدتُ عملية الإرسال'
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-tighter">
              <Info size={12} />
              <span>يضاف الرصيد تلقائياً خلال 5-15 دقيقة</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;

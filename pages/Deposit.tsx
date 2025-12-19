
import React, { useState } from 'react';
import { Copy, Check, Info, AlertTriangle, QrCode } from 'lucide-react';
import { CRYPTO_NETWORKS } from '../constants.tsx';

const Deposit: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(CRYPTO_NETWORKS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedNetwork.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">تعبئة المحفظة</h1>
        <p className="text-slate-400">قم بشحن حسابك باستخدام العملات الرقمية لبدء الاستثمار.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Selection */}
        <div className="lg:col-span-1 space-y-4">
          <p className="text-sm font-semibold text-slate-300 mb-2">اختر الشبكة</p>
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

        {/* Deposit Details */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-48 h-48 bg-white p-4 rounded-2xl mb-6 shadow-xl">
              {/* Fake QR for UI Demo */}
              <div className="w-full h-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                <QrCode size={100} className="text-slate-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4 italic">امسح رمز QR أو انسخ العنوان أدناه</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 mr-1">عنوان محفظة {selectedNetwork.name}</label>
              <div className="relative">
                <input 
                  type="text" 
                  readOnly 
                  value={selectedNetwork.address}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 px-4 rounded-2xl font-mono text-sm focus:outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'تم النسخ' : 'نسخ'}
                </button>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex gap-4">
              <div className="text-amber-500 shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-amber-500 font-bold text-sm mb-1">تنبيه هام</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  تأكد من إرسال مبلغ USDT حصراً عبر شبكة <strong>{selectedNetwork.name}</strong>. إرسال عملات أخرى أو استخدام شبكة مختلفة سيؤدي لفقدان أموالك بشكل دائم.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2 text-slate-500 text-xs">
              <Info size={14} />
              <span>يتم تأكيد الإيداع تلقائياً بعد 3-10 تأكيدات على الشبكة.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;

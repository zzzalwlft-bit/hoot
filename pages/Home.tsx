
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, TrendingUp, Wallet } from 'lucide-react';
import { User, VIPPackage } from '../types';

interface HomeProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  packages: VIPPackage[];
}

const Home: React.FC<HomeProps> = ({ user, setUser, packages }) => {
  const navigate = useNavigate();

  const handleSubscribe = (pkg: VIPPackage) => {
    if (user.balance >= pkg.price) {
      const confirmSub = window.confirm(`هل أنت متأكد من الاشتراك في ${pkg.name} بمبلغ $${pkg.price}؟`);
      if (confirmSub) {
        setUser(prev => ({
          ...prev,
          balance: prev.balance - pkg.price
        }));
        alert(`تم الاشتراك في ${pkg.name} بنجاح! ستبدأ الأرباح في الظهور خلال 24 ساعة.`);
      }
    } else {
      alert("رصيدك غير كافٍ. سيتم تحويلك إلى صفحة الشحن.");
      navigate('/deposit');
    }
  };

  const activePackages = packages.filter(p => p.status === 'active');

  return (
    <div className="pb-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-amber-500" />
          باقات الاستثمار الذكية
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          اختر الباقة المناسبة لك وابدأ في جني الأرباح اليومية بالدولار الأمريكي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activePackages.map((pkg) => {
          const dailyAmount = (pkg.price * (pkg.dailyProfitPercent / 100));
          const totalProfit = dailyAmount * pkg.durationDays;

          return (
            <div 
              key={pkg.id} 
              className="relative group bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 transition-all hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/5 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-all" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-4 py-1.5 rounded-xl border border-amber-500/20 uppercase tracking-widest">
                    {pkg.name}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-500 font-black text-xs bg-emerald-500/5 px-2 py-1 rounded-lg">
                    <Zap size={14} className="fill-emerald-500" />
                    <span>عائد مرتفع</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 tracking-wider">سعر الباقة</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white font-mono tracking-tighter">
                      {pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xl font-bold text-amber-500">$</span>
                  </div>
                </div>

                {/* Profit Metrics Dashboard */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/50 rounded-2xl hover:bg-slate-950 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tight">الربح اليومي</p>
                        <p className="text-lg font-black text-emerald-400 font-mono">
                          +${dailyAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-500/60">{pkg.dailyProfitPercent}%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/50 rounded-2xl hover:bg-slate-950 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tight">إجمالي الربح</p>
                        <p className="text-lg font-black text-amber-500 font-mono">
                          ${totalProfit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{pkg.durationDays} يوم</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <div className="border border-slate-800 py-2 rounded-xl bg-slate-800/20">سحب يومي</div>
                  <div className="border border-slate-800 py-2 rounded-xl bg-slate-800/20">دعم 24/7</div>
                </div>

                <button 
                  onClick={() => handleSubscribe(pkg)}
                  className="w-full py-4 bg-gradient-to-l from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 group-hover:scale-[1.02] active:scale-95"
                >
                  تنشيط الباقة الآن
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

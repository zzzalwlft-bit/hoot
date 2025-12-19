
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
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
          باقات الاستثمار
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          استثمر أموالك بذكاء في باقات VIP المختارة بعناية لتحقيق أفضل عائد يومي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePackages.map((pkg) => (
          <div 
            key={pkg.id} 
            className="relative group bg-slate-900 border border-slate-800 rounded-[2rem] p-8 transition-all hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/5 overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-all" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-4 py-1.5 rounded-xl border border-amber-500/20 uppercase">
                  {pkg.name}
                </span>
                <CheckCircle className="text-emerald-500/30" size={20} />
              </div>

              <div className="mb-8">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">المبلغ المطلوب</p>
                <p className="text-5xl font-black text-white font-mono tracking-tighter">
                  <span className="text-2xl text-amber-500 ml-1">$</span>
                  {pkg.price}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <TrendingUpSmall />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">الربح اليومي</p>
                    <p className="font-black text-emerald-400">{pkg.dailyProfitPercent}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <ClockSmall />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">المدة الزمنية</p>
                    <p className="font-black text-slate-200">{pkg.durationDays} يوم</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleSubscribe(pkg)}
                className="w-full py-4 bg-gradient-to-l from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10 group-hover:scale-[1.02] active:scale-95"
              >
                اشترك الآن
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrendingUpSmall = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

const ClockSmall = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

export default Home;

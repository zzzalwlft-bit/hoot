
import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus, LogIn, ShieldCheck, Sparkles } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 mb-4 shadow-2xl shadow-amber-500/20 rotate-3">
            <ShieldCheck size={40} className="text-slate-950" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">PROINVEST</h1>
          <p className="text-slate-400 font-medium">مستقبلك المالي يبدأ بخطوة ذكية</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/50">
          {/* Tabs */}
          <div className="flex bg-slate-950/50 p-1.5 rounded-2xl mb-8 border border-slate-800">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 mr-2 uppercase">اسم المستخدم</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="أدخل اسمك الكامل"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 pr-12 pl-4 rounded-2xl focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 mr-2 uppercase">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 pr-12 pl-4 rounded-2xl focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-xs font-bold text-slate-500 uppercase">كلمة المرور</label>
                {isLogin && <button type="button" className="text-[10px] text-amber-500 font-bold hover:underline">نسيت كلمة المرور؟</button>}
              </div>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 pr-12 pl-4 rounded-2xl focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 mr-2 uppercase">رمز الإحالة (اختياري)</label>
                <div className="relative">
                  <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="PRO-XXXX"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-4 pr-12 pl-4 rounded-2xl focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-700 font-mono"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-slate-950 transition-all flex items-center justify-center gap-2 mt-4 shadow-xl ${loading ? 'bg-slate-800 text-slate-600' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 shadow-amber-500/20'}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'تسجيل الدخول' : 'بدء الاستثمار الآن'}
                  {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500">
              بالمتابعة أنت توافق على <button className="text-slate-300 font-bold hover:text-white underline decoration-amber-500/50">شروط الخدمة</button> و <button className="text-slate-300 font-bold hover:text-white underline decoration-amber-500/50">سياسة الخصوصية</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

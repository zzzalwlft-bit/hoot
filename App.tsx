
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  LogOut, 
  ShieldCheck,
  Plus,
  Loader2,
  Settings
} from 'lucide-react';

import Home from './pages/Home.tsx';
import Deposit from './pages/Deposit.tsx';
import Earnings from './pages/Earnings.tsx';
import Referral from './pages/Referral.tsx';
import Withdraw from './pages/Withdraw.tsx';
import AdminDashboard from './pages/Admin/Dashboard.tsx';
import Auth from './pages/Auth.tsx';
import { User, VIPPackage, SystemSettings } from './types.ts';
import { VIP_PACKAGES as INITIAL_VIP_PACKAGES, CRYPTO_NETWORKS } from './constants.tsx';
import { supabase } from './supabase.ts';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [vipPackages, setVipPackages] = useState<VIPPackage[]>(INITIAL_VIP_PACKAGES);
  
  // إعدادات النظام التي يتحكم بها الأدمن
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    wallets: CRYPTO_NETWORKS.map(net => ({
      network: net.name,
      address: net.address,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + net.address
    }))
  });

  const [user, setUser] = useState<User>({
    id: '1',
    username: 'مستثمر جديد',
    email: '',
    balance: 0.00,
    totalEarnings: 0.00,
    referralCode: '',
    role: 'user'
  });

  const fetchAndSyncUser = async (sbUser: any) => {
    if (!sbUser) {
      setLoading(false);
      return;
    }
    
    try {
      const { data: { user: freshUser }, error } = await supabase.auth.getUser();
      if (error) throw error;

      const targetUser = freshUser || sbUser;
      const metadata = targetUser.user_metadata || {};
      const isAdmin = metadata.role === 'admin' || targetUser.app_metadata?.role === 'admin';
      
      setUser({
        id: targetUser.id,
        email: targetUser.email || '',
        username: metadata.full_name || metadata.username || 'مستثمر',
        balance: 150.50, // رصيد تجريبي
        totalEarnings: 45.00,
        referralCode: 'PRO-' + targetUser.id.substring(0, 5).toUpperCase(),
        role: isAdmin ? 'admin' : 'user'
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAndSyncUser(session.user);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAndSyncUser(session.user);
      else {
        setLoading(false);
        setUser({ id: '1', username: 'مستثمر جديد', email: '', balance: 0, totalEarnings: 0, referralCode: '', role: 'user' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-amber-500 font-bold animate-pulse font-sans">جاري التحقق من البيانات...</p>
      </div>
    );
  }

  if (!session) return <Auth />;

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans mb-20" dir="rtl">
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-black text-amber-500">
              <TrendingUp size={28} className="stroke-[3]" />
              <span className="tracking-tighter uppercase">ProInvest</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl py-1.5 px-4 flex items-center gap-2 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold uppercase">الرصيد</span>
                <span className="text-emerald-400 font-black font-mono text-sm">${user.balance.toFixed(2)}</span>
                <Link to="/deposit" className="mr-1 bg-emerald-500 text-slate-950 rounded-lg p-1 hover:bg-emerald-400 transition-colors">
                  <Plus size={14} />
                </Link>
              </div>
              <button onClick={handleLogout} className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Home user={user} setUser={setUser} packages={vipPackages} />} />
              <Route path="/deposit" element={<Deposit systemSettings={systemSettings} />} />
              <Route path="/earnings" element={<Earnings user={user} />} />
              <Route path="/referral" element={<Referral user={user} />} />
              <Route path="/withdraw" element={<Withdraw user={user} setUser={setUser} />} />
              <Route 
                path="/admin/*" 
                element={
                  user.role === 'admin' 
                  ? <AdminDashboard 
                      packages={vipPackages} 
                      setPackages={setVipPackages} 
                      systemSettings={systemSettings}
                      setSystemSettings={setSystemSettings}
                    /> 
                  : <Navigate to="/" />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 px-2 pb-safe">
          <div className="max-w-xl mx-auto flex justify-around items-center h-20">
            <BottomNavLink to="/" icon={<LayoutDashboard size={24} />} label="VIP" />
            <BottomNavLink to="/earnings" icon={<TrendingUp size={24} />} label="الأرباح" />
            <BottomNavLink to="/referral" icon={<Users size={24} />} label="الإحالة" />
            <BottomNavLink to="/withdraw" icon={<ArrowUpRight size={24} />} label="السحب" />
            {user.role === 'admin' ? (
              <BottomNavLink to="/admin" icon={<ShieldCheck size={24} />} label="الأدمن" />
            ) : (
              <BottomNavLink to="/deposit" icon={<Wallet size={24} />} label="شحن" />
            )}
          </div>
        </nav>
      </div>
    </HashRouter>
  );
};

const BottomNavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/admin' && location.pathname.startsWith('/admin'));
  return (
    <Link to={to} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 relative ${isActive ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}>
      {isActive && <div className="absolute top-0 w-12 h-1 bg-amber-500 rounded-b-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" />}
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>{icon}</div>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </Link>
  );
};

export default App;

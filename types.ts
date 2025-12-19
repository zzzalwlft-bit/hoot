
export interface VIPPackage {
  id: number;
  name: string;
  price: number;
  dailyProfitPercent: number;
  durationDays: number;
  status: 'active' | 'inactive';
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  totalEarnings: number;
  referralCode: string;
  role: 'user' | 'admin';
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdraw' | 'earnings' | 'referral';
  status: 'pending' | 'completed' | 'failed';
  network?: string;
  address?: string;
  date: string;
}

export interface Referral {
  id: string;
  name: string;
  earnings: number;
  status: 'Active' | 'Inactive';
  dateJoined: string;
}

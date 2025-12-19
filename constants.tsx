
import { VIPPackage } from './types';

export const VIP_PACKAGES: VIPPackage[] = [
  { id: 1, name: 'VIP 1', price: 50, dailyProfitPercent: 10, durationDays: 30, status: 'active' },
  { id: 2, name: 'VIP 2', price: 150, dailyProfitPercent: 10, durationDays: 30, status: 'active' },
  { id: 3, name: 'VIP 3', price: 500, dailyProfitPercent: 10, durationDays: 30, status: 'active' },
  { id: 4, name: 'VIP 4', price: 1200, dailyProfitPercent: 10, durationDays: 30, status: 'active' },
  { id: 5, name: 'VIP 5', price: 2500, dailyProfitPercent: 10, durationDays: 30, status: 'active' },
  { id: 6, name: 'VIP 6', price: 6000, dailyProfitPercent: 10, durationDays: 30, status: 'active' },
];

export const CRYPTO_NETWORKS = [
  { name: 'USDT (TRC20)', address: 'T9yD...xY56P89QwE2z1m5nB0pQ', icon: 'TRX' },
  { name: 'USDT (BEP20)', address: '0x71C...3a5f78b9c1d2e3f4a5b6', icon: 'BSC' },
  { name: 'USDT (ERC20)', address: '0xAb5...E9d1C2b3a4f5d6e7c8d9', icon: 'ETH' },
];

export const MIN_WITHDRAWAL = 10; // 10 USD

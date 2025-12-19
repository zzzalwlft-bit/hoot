
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://guminkwsjgosqdwiikpo.supabase.co';
const supabaseAnonKey = 'sb_publishable_gAchBpsi39GAtLm_gIVycg_l8ZKryFT';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

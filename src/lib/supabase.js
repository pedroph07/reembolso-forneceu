import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Fallback initial data when Supabase is not yet connected
const INITIAL_MOCK_DATA = [
  {
    id: 'req-1',
    email: 'ph645475@gmail.com',
    orderId: '909090',
    reason: 'Produto não funcionou como esperado',
    details: 'Instalei a integração mas não sincronizou o estoque adequadamente.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    status: 'Em Análise'
  },
  {
    id: 'req-2',
    email: 'cliente.antonio@gmail.com',
    orderId: 'TRD-2024-0089',
    reason: 'Comprei por engano',
    details: 'Realizei a compra da licença errada no checkout.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
    status: 'Aprovado'
  }
];

// Helper to fetch all reimbursements (from Supabase or LocalStorage)
export async function getReimbursements() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reimbursements')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          email: item.email,
          orderId: item.order_id,
          reason: item.reason,
          details: item.details,
          status: item.status,
          timestamp: item.created_at
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch fallback to LocalStorage:', e);
    }
  }

  // Fallback to LocalStorage
  const saved = localStorage.getItem('forneceup_reimbursements');
  return saved ? JSON.parse(saved) : INITIAL_MOCK_DATA;
}

// Helper to save a new reimbursement
export async function addReimbursement(newRecord) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reimbursements')
        .insert([{
          email: newRecord.email,
          order_id: newRecord.orderId,
          reason: newRecord.reason,
          details: newRecord.details,
          status: 'Em Análise'
        }])
        .select();

      if (!error && data && data[0]) {
        const created = data[0];
        return {
          id: created.id,
          email: created.email,
          orderId: created.order_id,
          reason: created.reason,
          details: created.details,
          status: created.status,
          timestamp: created.created_at
        };
      }
    } catch (e) {
      console.warn('Supabase insert fallback to LocalStorage:', e);
    }
  }

  return newRecord;
}

// Helper to update status
export async function updateReimbursementStatus(id, newStatus) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('reimbursements')
        .update({ status: newStatus })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase status update fallback to LocalStorage:', e);
    }
  }
}

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_PUBLIC_KEY);

async function updateSupabaseUser(userId, email) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ id: userId, email }, { onConflict: ['id'] });

  if (error) throw error;
  return data;
}

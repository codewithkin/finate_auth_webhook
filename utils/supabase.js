import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_PUBLIC_KEY);

async function updateSupabaseUser(user) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ id: user.id, 
      email: user.email_addresses[0]?.email_address,
      first_name: user.first_name,
      last_name: user.last_name,
      image_url: user.image_url,
      profile_image_url: user.profile_image_url
    }, { onConflict: ['id'] });

  if (error) throw error;
  return data;
}

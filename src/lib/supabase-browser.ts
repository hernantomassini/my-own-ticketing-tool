'use client';

import { Database } from '@/models/supabase';
import { createBrowserClient } from '@supabase/ssr';

export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !key) throw new Error('Missing Supabase envs');

  return createBrowserClient<Database>(url, key);
}

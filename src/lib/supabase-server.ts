import 'server-only';

import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function supabaseServer() {
  const store = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !key) throw new Error('Missing Supabase envs');

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return store.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            store.set(name, value, options as CookieOptions | undefined);
          })
        }
      },
    }
  );
}

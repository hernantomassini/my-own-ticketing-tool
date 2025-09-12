'use server';

import { supabaseServer } from '../lib/supabase-server';

export async function deleteBoard(_: unknown, formData: FormData) {
  const id = String(formData.get('id') || '').trim();

  if (!id) {
    return { ok: false, error: "Missing id" };
  }

  const supabase = await supabaseServer();

  const { error } = await supabase
    .from('board')
    .delete()
    .eq('id', id);

  if (!error) {
    return { ok: true };
  }

  return { ok: false, error: error.message };
}

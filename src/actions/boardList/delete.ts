'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { DeleteResult } from '@/models/actions-params/delete-result.model';
import { DBTableName } from '@/models/enum/db-table-name.model';

export async function deleteBoardList(prev: DeleteResult, formData: FormData) {
  const id = String(formData.get('id') || '').trim();

  if (!id) {
    return { ok: false, error: "Missing id" };
  }

  const supabase = await supabaseServer();

  const { error } = await supabase
    .from(DBTableName.BoardList)
    .delete()
    .eq('id', id);

  if (!error) {
    return { ok: true };
  }

  return { ok: false, error: error.message };
}

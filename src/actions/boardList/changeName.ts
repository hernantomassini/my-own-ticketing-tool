'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { DBTableName } from '@/models/enum/db-table-name.model';

export async function changeBoardListName(boardListId: string, newTitle: string): Promise<{ ok: boolean, error?: unknown }> {
  if (!boardListId || !newTitle) {
    return { ok: false };
  }

  const title = newTitle.trim();
  const supabase = await supabaseServer();

  try {
    await supabase
      .from(DBTableName.BoardList)
      .update({ title })
      .eq('id', boardListId)
      .throwOnError();
  } catch(ex) {
    return { ok: false, error: ex };
  }

  return { ok: true };
}

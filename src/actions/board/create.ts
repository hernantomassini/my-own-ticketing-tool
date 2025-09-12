'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { Board } from '@/models/board.model';
import { DBTableName } from '@/models/enum/db-table-name.model';
import { Database } from '@/models/supabase';

export async function createBoard(_prev: Board | null, formData: FormData): Promise<Board | null> {
  const name = String(formData.get('name') || '').trim();

  if (!name) {
    return null;
  }

  type BoardInsert = Database['public']['Tables']['board']['Insert'];
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from(DBTableName.Board)
    .insert({ name } satisfies BoardInsert)
    .select('id, name')
    .single();

  return error ? null : data;
}

'use server';

import { CreateBoardListButtonProps } from '@/app/(main)/board/[boardId]/components/CreateBoardListButton';
import { supabaseServer } from '@/lib/supabase-server';
import { DBTableName } from '@/models/enum/db-table-name.model';
import { Database } from '@/models/supabase';

export async function createBoardList(params: CreateBoardListButtonProps, _prev: string | null, formData: FormData): Promise<string | null> {
  const boardId = params?.boardId;
  const name = String(formData.get('name') || '').trim();

  if (!boardId || !name) {
    return null;
  }

  type BoardInsert = Database['public']['Tables'][DBTableName.BoardList]['Insert'];
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from(DBTableName.BoardList)
    .insert({ board_id: boardId, title: name } satisfies BoardInsert)
    .select('id')
    .single();

  return error ? null : data.id;
}

'use server';

import { supabaseServer } from '../../supabase/supabase-server';
import { Board } from '@/models/board.model';
import { Database } from '@/models/supabase';

export async function createBoard(_prev: Board | null, formData: FormData): Promise<Board | null> {
  const name = String(formData.get('name') || '').trim();

  if (!name) {
    return null;
  }

  type BoardInsert = Database['public']['Tables']['board']['Insert'];
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('board')
    .insert({ name } satisfies BoardInsert)
    .select('id, name')
    .single();

  if (error) {
    return null;
  }

  if (data) {
    return data
  }

  return null;
}

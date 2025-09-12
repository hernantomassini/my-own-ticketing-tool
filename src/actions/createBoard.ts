'use server';

import { supabaseServer } from '../lib/supabase-server';
import { Board } from '@/models/board.model';
import { Database } from '@/models/supabase';
import { revalidatePath } from 'next/cache';

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

  if (!error) {
    revalidatePath("/home");
  }

  return error ? null : data;
}

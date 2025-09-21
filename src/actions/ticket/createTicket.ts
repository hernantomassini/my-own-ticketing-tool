'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { CreateTicketRequestParams } from '@/models/actions-params/create-ticket-request.model';
import { DBTableName } from '@/models/enum/db-table-name.model';
import { Database } from '@/models/supabase';
import { revalidatePath } from 'next/cache';

export async function createTicket(params: CreateTicketRequestParams, _prev: string | null, formData: FormData): Promise<string | null> {
  const boardId = params?.boardListId;
  const name = String(formData.get('name') || '').trim();

  if (!boardId || !name) {
    return null;
  }

  type TicketInsert = Database['public']['Tables'][DBTableName.Ticket]['Insert'];
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from(DBTableName.Ticket)
    .insert({ list_id: boardId, title: name } satisfies TicketInsert)
    .select('id')
    .single();


  if (!error) {
    revalidatePath(`/board/${boardId}`);
  }

  return error ? null : data.id;
}

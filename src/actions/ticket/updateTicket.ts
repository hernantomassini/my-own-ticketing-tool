'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { DBTableName } from '@/models/enum/db-table-name.model';
import { Database } from '@/models/supabase';
import { revalidatePath } from 'next/cache';

export type UpdateTicketState = { error?: string; ok?: boolean } | null;

export async function updateTicket(_prev: UpdateTicketState, formData: FormData): Promise<UpdateTicketState> {
  const id = String(formData.get('ticket_id') || '').trim();
  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const boardId = formData.get('board_id');

  const assignedUserIdValue = formData.get("assigned_user_id");
  const assignedUserId = !assignedUserIdValue || assignedUserIdValue === "undefined" || assignedUserIdValue === ""
    ? null
    : String(assignedUserIdValue);

  if (!id || !title || !description || !boardId) {
    return { error: "Missing data" };
  }

  type TicketUpdate = Database['public']['Tables'][DBTableName.Ticket]['Update'];
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from(DBTableName.Ticket)
    .update({ id, title, description, assigned_to: assignedUserId, updated_at: new Date().toISOString() } satisfies TicketUpdate)
    .eq('id', id)

  if (error) {
    console.error(error);
    return { error: "Failed to update ticket" };
  }

  revalidatePath(`/board/${boardId}`);

  return { ok: true };
}

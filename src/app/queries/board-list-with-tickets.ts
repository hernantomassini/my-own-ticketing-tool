import "server-only"

import { supabaseServer } from '@/lib/supabase-server';
import { DBTableName } from "@/models/enum/db-table-name.model";
import { BoardColumn } from "@/models/board-column.model";

export async function getBoardsListWithTickets(boardId: string): Promise<BoardColumn[]> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from(DBTableName.BoardList)
    .select(`
      id,
      title,
      position: sort_order,
      tickets: ticket (
        id,
        title,
        position: sort_order,
        description,
        assignedTo: profiles ( id, display_name )
      )
    `)
    .eq('board_id', boardId)
    .order('sort_order', { ascending: true })
    .order('sort_order', { referencedTable: 'ticket', ascending: true })
    .overrideTypes<BoardColumn[], { merge: false }>();

  if (error) {
    throw new Error(`getBoardListsWithTickets: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No user session found');
  }

  data.forEach(x => x.tickets.forEach(t => {
    if (t.assignedTo) {
      t.assignedTo.isCurrentUser = t.assignedTo.id === user.id;
    }
  }));

  return data;
}

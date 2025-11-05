"use server"

import { getTranslations } from 'next-intl/server';
import { getBoardsListWithTickets } from '@/app/queries/board-list-with-tickets';
import { BoardColumn } from '@/models/board-column.model';

import CreateBoardListButton from './components/CreateBoardListButton';
import BoardList from './components/BoardList';

interface BoardPageRouteProps {
  params: {
    boardId: string;
  }
}

export default async function BoardPage({ params }: BoardPageRouteProps) {
  const { boardId } = await params;
  const t = await getTranslations('board');

  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidV4Regex.test(boardId)) {
    return (
      <div>
        <h1>{t('error')}</h1>
        <p>{t('invalid-board-id')}</p>
      </div>
    );
  }

  let boardsWithTickets: BoardColumn[];

  try {
    boardsWithTickets = await getBoardsListWithTickets(boardId);
  } catch(ex) {
    console.error('Board-list-tickets query failed:', ex);
    return;
  }

  return (
    <div className="flex flex-col flex-1 overflow-x-auto overscroll-x-contain touch-pan-x">
      <div className="m-8">
        <div className="flex items-start gap-6 mx-4 py-2 whitespace-nowrap">
          {(boardsWithTickets || []).map((list) => (
            <BoardList
              key={list.id}
              id={list.id}
              title={list.title}
              tickets={list.tickets}
              boardId={boardId}
            />
          ))}

          <CreateBoardListButton
            boardId={boardId}
          />
        </div>
      </div>
    </div>
  );
}

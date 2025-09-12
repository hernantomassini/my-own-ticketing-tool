import 'server-only'

import CreateBoardButton from "./components/CreateBoardButton";
import { getTranslations } from 'next-intl/server';
import BoardButton from './components/BoardButton';
import { supabaseServer } from '@/lib/supabase-server';
import { DBTableName } from '@/models/enum/db-table-name.model';

export default async function HomePage() {
  const t = await getTranslations('home');
  const supabase = await supabaseServer();

  const { data: boards, error } = await supabase
    .from(DBTableName.Board)
    .select('id, name')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Boards query failed:', error);
  }

  return (
    <div className="m-8 flex flex-col items-center md:items-start">

      <span className="text-3xl">{t('title')}</span>

      <div className="flex flex-wrap gap-8 ml-12 mt-8">
        <CreateBoardButton/>

        {(boards || []).map((board) => (
          <BoardButton
            key={board.id}
            boardId={board.id}
            deletable={true}
            label={board.name}
            href={`/board/${board.id}`}
          >
          </BoardButton>
        ))}

      </div>
    </div>
  );
}

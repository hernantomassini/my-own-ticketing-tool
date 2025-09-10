import 'server-only'

import ResponsiveCreateBoardButton from "./components/ResponsiveCreateBoardButton";
import { supabaseServer } from '../../../supabase/supabase-server';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('home');
  const supabase = await supabaseServer();

  const { data: boards, error } = await supabase
    .from('board')
    .select('id, name')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col items-center md:items-start">

      <span className="text-3xl">{t('title')}</span>

      <div className="m-8">
        <ResponsiveCreateBoardButton />
      </div>
    </div>

    // <div>
    //   <h1>Board</h1>
    //   <ul>
    //     {columns.map((col) => (
    //       <li key={col.id}>{col.title}</li>
    //     ))}
    //   </ul>
    // </div>
  );
}

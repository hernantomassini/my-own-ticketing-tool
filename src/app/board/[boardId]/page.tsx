import 'server-only';

import { BoardPageRouteProps } from "@/models/routes/board-page.model";

export default async function BoardPage({ params }: BoardPageRouteProps) {
  const { boardId } = await params;
  console.log('boardId', boardId);

  return (
    <>
      BoardPage - BoardId {boardId}
    </>
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

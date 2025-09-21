import InlineInput from "@/components/InlineInput";
import AddTicketButton from "./AddTicket";
import DeleteButton from "@/components/DeleteButton";
import { deleteBoardList } from "@/actions/boardList/delete";
import { getTranslations } from "next-intl/server";
import { TicketSummary } from "@/models/summary/ticket-summary.model";
import TicketButton from "./Ticket";

interface BoardListProps {
  id: string;
  title: string;
  tickets: TicketSummary[];
}

export default async function BoardList({ id, title, tickets }: BoardListProps) {

  const t = await getTranslations('board');

  return (
    <div className="w-xs border rounded-xl shrink-0 dark:bg-gray-800 bg-gray-100 relative flex flex-col overflow-y-auto max-h-[calc(100dvh-8rem)]">
      <div className="p-4 flex flex-col justify-between">
        <div className="mb-3 w-[90%]">
          <InlineInput
            id={id}
            title={title}
          />
        </div>

        <div className="space-y-3 mb-3">
          {(tickets || []).map((ticket) => (
            <TicketButton
              key={ticket.id}
              ticket={ticket}
            />
          ))}
        </div>

        <AddTicketButton
          id={id}
        />
      </div>

      <DeleteButton id={id} action={deleteBoardList} title={t('delete-board-list-title')} className="mt-1"/>
    </div>
  );
}

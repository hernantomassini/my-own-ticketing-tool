import { TicketSummary } from "@/models/summary/ticket-summary.model";

interface TicketButtonProp {
  ticket: TicketSummary;
}

export default function TicketButton({ ticket }: TicketButtonProp) {
  return (
    <div className="p-3 border-solid cursor-pointer dark:bg-gray-700 bg-gray-50 rounded-xl shadow-sm text-wrap break-words">
      {ticket.title}
    </div>
  );
}

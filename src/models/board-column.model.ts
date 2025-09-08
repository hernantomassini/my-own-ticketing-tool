import { TicketSummary } from "./summary/ticket-summary.model";

export interface BoardColumn {
  id: number;
  title: string;
  position: number;

  tickets: TicketSummary[];
}

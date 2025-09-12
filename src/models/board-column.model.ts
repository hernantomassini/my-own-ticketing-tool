import { TicketSummary } from "./summary/ticket-summary.model";

export interface BoardColumn {
  id: string;
  title: string;
  position: number;
  tickets: TicketSummary[];
}

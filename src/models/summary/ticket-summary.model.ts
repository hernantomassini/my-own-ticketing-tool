export interface TicketSummary {
  id: number;
  title: string;
  position: number;
  description?: string;
  assignedTo?: string;
}

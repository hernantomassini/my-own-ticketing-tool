import { UserSummary } from "./user-summary.model";

export interface TicketSummary {
  id: number;
  title: string;
  position: number;
  description?: string;
  assignedTo?: UserSummary;
}

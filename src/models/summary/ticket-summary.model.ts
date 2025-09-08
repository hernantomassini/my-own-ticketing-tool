import { UserSummary } from "./user-summary.model";

export interface TicketSummary {
  id: number;
  title: string;
  order: number;

  userInfo: UserSummary;
}

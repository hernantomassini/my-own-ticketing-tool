export interface Ticket {
  id: string;
  title: string;
  order: number;

  description?: string;
  asignedTo?: string;
}

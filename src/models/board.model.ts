import { BoardColumn } from "./board-column.model";

export interface Board {
  id: string;
  title: string;

  columns: BoardColumn[];
}

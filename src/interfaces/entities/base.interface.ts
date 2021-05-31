import { IDateTime } from "@/interfaces/entities/datetime.interface";

export interface Base {
  id: string;
  active: boolean;
  version: number;
  datetime: IDateTime;
}

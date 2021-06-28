import { IDateTime } from "@/interfaces/entities/datetime.interface";

export interface Base {
  id: string;
  no: number;
  active: boolean;
  version: number;
  datetime: IDateTime;
  seen: number[];
  status: number;
}

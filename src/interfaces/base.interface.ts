import { IDateTime } from "@/interfaces/datetime.interface";

export interface Base {
  id: string;
  active: boolean;
  version: number;
  datetime: IDateTime;
}

import { Base } from "@/interfaces/entities/base.interface";

export interface ITicket extends Base {
  code: string;
  title: string;
  context: IContext[];
}

export interface IContext {
  text: string;
  owner: "customer" | "support";
  created_at: string | Date;
  contextCode: string;
}
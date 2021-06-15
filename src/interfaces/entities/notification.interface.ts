import { Base } from "@/interfaces/entities/base.interface";

export interface INotifications extends Base {
  title: string;
  body: string;
  image: string;
}
//===========================================
//
//  ######  ##   ####  ##  ##  #####  ######
//    ##    ##  ##     ## ##   ##       ##
//    ##    ##  ##     ####    #####    ##
//    ##    ##  ##     ## ##   ##       ##
//    ##    ##   ####  ##  ##  #####    ##
//
//===========================================

import { Base } from "@/interfaces/base/base.interface";
import { ICustomer } from "./customer.interface";

export interface ITicket extends Base {
  code: string;
  title: string;
  hint: string;
  context: IContext[];
  customer: ICustomer;
}

//=============================================================
//
//   ####   #####   ##     ##  ######  #####  ##    ##  ######
//  ##     ##   ##  ####   ##    ##    ##      ##  ##     ##
//  ##     ##   ##  ##  ## ##    ##    #####    ####      ##
//  ##     ##   ##  ##    ###    ##    ##      ##  ##     ##
//   ####   #####   ##     ##    ##    #####  ##    ##    ##
//
//=============================================================
export interface IContext {
  text: string;
  owner: "customer" | "support";
  created_at: string | Date;
  contextCode: string;
}

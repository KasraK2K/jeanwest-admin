//===========================================
//
//   #####   #####    ####    #####  #####
//  ##   ##  ##  ##   ##  ##  ##     ##  ##
//  ##   ##  #####    ##  ##  #####  #####
//  ##   ##  ##  ##   ##  ##  ##     ##  ##
//   #####   ##   ##  ####    #####  ##   ##
//
//===========================================

import { Base } from "@/interfaces/base/base.interface";
import { ICustomer } from "./customer.interface";

export interface IOrder extends Base {
  code: string;
  status: number;
  banimodeStatus: number;
  erpCode: string;
  erpId: string;
  banimodeCode: string;
  cost: number;
  costDetail: Record<string, unknown>;
  item: Record<string, unknown>[];
  itemDetail: Record<string, unknown>[];
  logistic: Record<string, unknown>;
  address: Record<string, unknown>;
  promotion: Record<string, unknown>;
  customer: ICustomer;
  returnDetail: Record<string, unknown>;
  delivery: Record<string, unknown>;
}

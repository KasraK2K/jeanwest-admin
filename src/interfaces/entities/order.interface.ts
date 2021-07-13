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
  item: { barcode: string; count: number; active: boolean }[];
  itemDetail: Record<string, unknown>[];
  returnDetail: Record<string, unknown>;
  logistic: Record<string, unknown>;
  delivery: Record<string, unknown>;
  address: Record<string, unknown>;
  promotion: Record<string, unknown>;
  customer: ICustomer;
}

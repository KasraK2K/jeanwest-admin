//=====================================================================
//
//   ####  ##   ##   ####  ######   #####   ###    ###  #####  #####
//  ##     ##   ##  ##       ##    ##   ##  ## #  # ##  ##     ##  ##
//  ##     ##   ##   ###     ##    ##   ##  ##  ##  ##  #####  #####
//  ##     ##   ##     ##    ##    ##   ##  ##      ##  ##     ##  ##
//   ####   #####   ####     ##     #####   ##      ##  #####  ##   ##
//
//=====================================================================

import { Base } from "@/interfaces/base/base.interface";
import { IOrder } from "./order.interface";
import { ITicket } from "./ticket.interface";

export interface ICustomer extends Base {
  phoneNumber?: string;
  code?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: number;
  loggedInAt?: string;
  birthDate?: string;
  erpId?: string;
  erpPartnerShipCode?: string;
  erpCustomerType?: string;
  erpTsCodeId?: string;
  erpUpdatedAt?: string;
  banimodeUserId?: string;
  registerPlatform: number;
  loginPlatform: number;
  favorites?: [];
  relationsToOthers?: [];
  relationsOfOthers?: [];
  address?: [];
  tickets?: ITicket[];
  orders?: IOrder[];
}

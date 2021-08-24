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
  favorites?: [];
  relationsToOthers?: [];
  relationsOfOthers?: [];
  address?: [];
  tickets?: [];
  orders?: [];
}

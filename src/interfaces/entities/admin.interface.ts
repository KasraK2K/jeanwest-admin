//=============================================
//
//    ###    ####    ###    ###  ##  ##     ##
//   ## ##   ##  ##  ## #  # ##  ##  ####   ##
//  ##   ##  ##  ##  ##  ##  ##  ##  ##  ## ##
//  #######  ##  ##  ##      ##  ##  ##    ###
//  ##   ##  ####    ##      ##  ##  ##     ##
//
//=============================================

import { Base } from "@/interfaces/base/base.interface";

export interface IAdmin extends Base {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  permissions: number[];
}

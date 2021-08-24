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
  role: Role;
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
}

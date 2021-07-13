//=============================================
//
//    ###    ####    ###    ###  ##  ##     ##
//   ## ##   ##  ##  ## #  # ##  ##  ####   ##
//  ##   ##  ##  ##  ##  ##  ##  ##  ##  ## ##
//  #######  ##  ##  ##      ##  ##  ##    ###
//  ##   ##  ####    ##      ##  ##  ##     ##
//
//=============================================

export interface IAdmin {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: Role;
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
}

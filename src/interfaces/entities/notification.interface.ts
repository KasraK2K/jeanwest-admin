//============================================================================================
//
//  ##     ##   #####   ######  ##  #####  ##   ####    ###    ######  ##   #####   ##     ##
//  ####   ##  ##   ##    ##    ##  ##     ##  ##      ## ##     ##    ##  ##   ##  ####   ##
//  ##  ## ##  ##   ##    ##    ##  #####  ##  ##     ##   ##    ##    ##  ##   ##  ##  ## ##
//  ##    ###  ##   ##    ##    ##  ##     ##  ##     #######    ##    ##  ##   ##  ##    ###
//  ##     ##   #####     ##    ##  ##     ##   ####  ##   ##    ##    ##   #####   ##     ##
//
//============================================================================================

import { Base } from "@/interfaces/base/base.interface";

export interface INotification extends Base {
  title: string;
  body: string;
  image: string;
  icon: string;
  roles: number[];
}

export interface IPushNotification extends INotification {
  name: string;
  click_action: string;
  erpCustomerType: number[];
  sent: boolean;
}

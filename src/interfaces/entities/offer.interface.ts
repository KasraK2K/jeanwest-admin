//========================================
//
//   #####   #####  #####  #####  #####
//  ##   ##  ##     ##     ##     ##  ##
//  ##   ##  #####  #####  #####  #####
//  ##   ##  ##     ##     ##     ##  ##
//   #####   ##     ##     #####  ##   ##
//
//========================================

import { OfferTypeEnum } from "@/enums/offer.enum";
import { Base } from "@/interfaces/base/base.interface";
import { IGroup } from "./group.interface";

export interface IOffer extends Base {
  name: string;
  code: string;
  singularity: boolean;
  trigger: ITrigger;
  target: ITarget;
  maxDiscount: number;
  minTotal: number;
  countLimit: number;
  expirationDate?: string | null;
  startDate?: string | null;
  triggerGroup: IGroup;
  targetGroup: IGroup;
  roles: [];
}

export interface ITrigger {
  type: OfferTypeEnum;
  value: number;
}

export interface ITarget extends ITrigger {
  type: OfferTypeEnum;
  value: number;
  reduction: number;
}

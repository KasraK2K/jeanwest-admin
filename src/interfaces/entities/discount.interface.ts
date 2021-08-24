//================================================================
//
//  ####    ##   ####   ####   #####   ##   ##  ##     ##  ######
//  ##  ##  ##  ##     ##     ##   ##  ##   ##  ####   ##    ##
//  ##  ##  ##   ###   ##     ##   ##  ##   ##  ##  ## ##    ##
//  ##  ##  ##     ##  ##     ##   ##  ##   ##  ##    ###    ##
//  ####    ##  ####    ####   #####    #####   ##     ##    ##
//
//================================================================

import { IGroup } from "./group.interface";
import { Base } from "@/interfaces/base/base.interface";

export interface IDiscount extends Base {
  name: string;
  code: string;
  reductionPrice: number;
  isPercentage: boolean;
  promotionGroup: IGroup;
  countLimit?: number;
  usageCount?: number;
  maxTotal?: number;
  minTotal?: number;
  singularity?: boolean;
  expirationDate?: string;
  startDate?: string;
}

//========================================
//
//   #####   #####  #####  #####  #####
//  ##   ##  ##     ##     ##     ##  ##
//  ##   ##  #####  #####  #####  #####
//  ##   ##  ##     ##     ##     ##  ##
//   #####   ##     ##     #####  ##   ##
//
//========================================

import { Base } from "@/interfaces/base/base.interface";
import { IGroup } from "./group.interface";

export interface IOffer extends Base {
  name: string;
  code: string;
  singularity: boolean;
  trigger: { type: string; value: number };
  target: { type: string; value: number; reduction: number };
  maxDiscount: number;
  minTotal: number;
  countLimit: number;
  expirationDate?: string | null;
  startDate?: string | null;
  triggerGroup: IGroup;
  targetGroup: IGroup;
}

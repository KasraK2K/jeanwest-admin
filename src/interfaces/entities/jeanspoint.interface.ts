//===================================================================================
//
//      ##  #####    ###    ##     ##   ####  #####    #####   ##  ##     ##  ######
//      ##  ##      ## ##   ####   ##  ##     ##  ##  ##   ##  ##  ####   ##    ##
//      ##  #####  ##   ##  ##  ## ##   ###   #####   ##   ##  ##  ##  ## ##    ##
//  ##  ##  ##     #######  ##    ###     ##  ##      ##   ##  ##  ##    ###    ##
//   ####   #####  ##   ##  ##     ##  ####   ##       #####   ##  ##     ##    ##
//
//===================================================================================

import { Base } from "@/interfaces/base/base.interface";
import { IGroup } from "./group.interface";

export interface IJeansPoint extends Base {
  name: string;
  erpName: string;
  code: string;
  erpPromotionPointId: number;
  singularity: string;
  countLimit: number;
  minTotal: number;
  description: string;
  promotionGroup: IGroup;
}

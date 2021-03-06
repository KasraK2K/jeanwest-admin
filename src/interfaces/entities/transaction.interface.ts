//=============================================================================================
//
//  ######  #####      ###    ##     ##   ####    ###     ####  ######  ##   #####   ##     ##
//    ##    ##  ##    ## ##   ####   ##  ##      ## ##   ##       ##    ##  ##   ##  ####   ##
//    ##    #####    ##   ##  ##  ## ##   ###   ##   ##  ##       ##    ##  ##   ##  ##  ## ##
//    ##    ##  ##   #######  ##    ###     ##  #######  ##       ##    ##  ##   ##  ##    ###
//    ##    ##   ##  ##   ##  ##     ##  ####   ##   ##   ####    ##    ##   #####   ##     ##
//
//=============================================================================================

import { Base } from "@/interfaces/base/base.interface";

export interface ITransaction extends Base {
  gateId: number;
  type: number;
  amount: number;
  payment_status: number;
  code: string;
  doc: Record<string, unknown>;
}

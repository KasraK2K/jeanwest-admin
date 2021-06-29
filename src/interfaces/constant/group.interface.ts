//=============================================================================================
//
//  #####    ####          ##  ##     ##  ######  #####  #####    #####    ###     ####  #####
//  ##  ##  ##             ##  ####   ##    ##    ##     ##  ##   ##      ## ##   ##     ##
//  #####   ##  ###        ##  ##  ## ##    ##    #####  #####    #####  ##   ##  ##     #####
//  ##      ##   ##        ##  ##    ###    ##    ##     ##  ##   ##     #######  ##     ##
//  ##       ####          ##  ##     ##    ##    #####  ##   ##  ##     ##   ##   ####  #####
//
//=============================================================================================

import { IActive } from "./base";

export interface IPromotionGroup {
  active: IActive[];
  group: {
    eq: string[];
  };
  subGroup: {
    eq: string[];
  };
  size: {
    ct: string[];
  };
  gender: {
    eq: string[];
  };
  brand: {
    eq: string[];
  };
  ageGroup: {
    eq: string[];
  };
  colorFamily: {
    eq: string[];
  };
}

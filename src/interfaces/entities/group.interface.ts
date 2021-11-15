//=============================================
//
//   ####    #####     #####   ##   ##  #####
//  ##       ##  ##   ##   ##  ##   ##  ##  ##
//  ##  ###  #####    ##   ##  ##   ##  #####
//  ##   ##  ##  ##   ##   ##  ##   ##  ##
//   ####    ##   ##   #####    #####   ##
//
//=============================================

import { Base } from "@/interfaces/base/base.interface";

export interface IGroup extends Base {
  code: string;
  target: ITarget;
}

export interface ITarget {
  group?: {
    eq: string[];
  };
  subGroup?: {
    eq: string[];
  };
  size?: {
    ct: string[];
  };
  gender?: {
    eq: string[];
  };
  brand?: {
    eq: string[];
  };
  ageGroup?: {
    eq: string[];
  };
  colorFamily?: {
    eq: string[];
  };
  styleCode?: {
    eq: string[];
  };
  sku?: {
    eq: string[];
  };
  barcode?: {
    eq: string[];
  };
  quantity?: {
    [key: string]: number;
  }; // gt-gte-lt-lte-eq
  basePrice?: {
    [key: string]: number;
  }; // gt-gte-lt-lte-eq
  salePrice?: {
    [key: string]: number;
  }; // gt-gte-lt-lte-eq
}

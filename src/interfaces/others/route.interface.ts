//====================================================
//
//  #####     #####   ##   ##  ######  #####  #####
//  ##  ##   ##   ##  ##   ##    ##    ##     ##  ##
//  #####    ##   ##  ##   ##    ##    #####  #####
//  ##  ##   ##   ##  ##   ##    ##    ##     ##  ##
//  ##   ##   #####    #####     ##    #####  ##   ##
//
//====================================================

import { VueConstructor } from "vue";

export interface IRouter {
  path: string;
  name: string;
  component: VueConstructor<Vue>;
  meta: {
    title: string;
  };
  props?: boolean;
}

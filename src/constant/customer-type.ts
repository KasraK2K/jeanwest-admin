//============================================================================================================
//
//   ####  ##   ##   ####  ######   #####   ###    ###  #####  #####          ######  ##    ##  #####   #####
//  ##     ##   ##  ##       ##    ##   ##  ## #  # ##  ##     ##  ##           ##     ##  ##   ##  ##  ##
//  ##     ##   ##   ###     ##    ##   ##  ##  ##  ##  #####  #####            ##      ####    #####   #####
//  ##     ##   ##     ##    ##    ##   ##  ##      ##  ##     ##  ##           ##       ##     ##      ##
//   ####   #####   ####     ##     #####   ##      ##  #####  ##   ##          ##       ##     ##      #####
//
//============================================================================================================

import { IMapCustomerType } from "./../interfaces/constant/map.interface";

export const MapCustomerType: Map<string, IMapCustomerType> = new Map([
  ["-11", { erpName: "Gold B2B", name: "Gold B2B", color: "" }],
  ["-10", { erpName: "Silver B2B", name: "Silver B2B", color: "" }],
  ["-9", { erpName: "پرسنل سطح 7", name: "پرسنل سطح ۷", color: "" }],
  ["-8", { erpName: "پرسنل سطح 6", name: "پرسنل سطح ۶", color: "" }],
  ["-7", { erpName: "5 پرسنل سطح", name: "پرسنل سطح ۵", color: "" }],
  ["-6", { erpName: "4 پرسنل سطح", name: "پرسنل سطح ۴", color: "" }],
  ["-5", { erpName: "3 پرسنل سطح", name: "پرسنل سطح ۳", color: "" }],
  ["-4", { erpName: "2 پرسنل سطح", name: "پرسنل سطح ۲", color: "" }],
  ["-3", { erpName: "1 پرسنل سطح", name: "پرسنل سطح ۱", color: "" }],
  ["-2", { erpName: "Tourist10", name: "Tourist10", color: "" }],
  ["-1", { erpName: "Tourist15", name: "Tourist15", color: "" }],
  ["0", { erpName: "Tourist20", name: "Tourist20", color: "" }],
  ["1", { erpName: "عادی", name: "عادی", color: "" }],
  ["2", { erpName: "كارمند", name: "كارمند", color: "" }],
  ["3", { erpName: "Blue", name: "Blue", color: "" }],
  ["4", { erpName: "Blue+", name: "Blue+", color: "" }],
  ["5", { erpName: "Blue2+", name: "Blue2+", color: "" }],
  ["6", { erpName: "Silver", name: "Silver", color: "" }],
  ["7", { erpName: "Gold", name: "Gold", color: "" }],
  ["8", { erpName: "Platinum", name: "Platinum", color: "" }],
  ["10", { erpName: "Tourist10", name: "Tourist10", color: "" }],
  ["11", { erpName: "Tourist15", name: "Tourist15", color: "" }],
  ["12", { erpName: "Tourist20", name: "Tourist20", color: "" }],
]);

export const CustomerTypes = [
  {
    text: "Gold B2B",
    value: -11,
  },
  {
    text: "Silver B2B",
    value: -10,
  },
  {
    text: "پرسنل سطح ۷",
    value: -9,
  },
  {
    text: "پرسنل سطح ۶",
    value: -8,
  },
  {
    text: "پرسنل سطح ۵",
    value: -7,
  },
  {
    text: "پرسنل سطح ۴",
    value: -6,
  },
  {
    text: "پرسنل سطح ۳",
    value: -5,
  },
  {
    text: "پرسنل سطح ۲",
    value: -4,
  },
  {
    text: "پرسنل سطح ۱",
    value: -3,
  },
  {
    text: "Tourist10",
    value: -2,
  },
  {
    text: "Tourist15",
    value: -1,
  },
  {
    text: "Tourist20",
    value: 0,
  },
  {
    text: "عادی",
    value: 1,
  },
  {
    text: "كارمند",
    value: 2,
  },
  {
    text: "Blue",
    value: 3,
  },
  {
    text: "Blue+",
    value: 4,
  },
  {
    text: "Blue2+",
    value: 5,
  },
  {
    text: "Silver",
    value: 6,
  },
  {
    text: "Gold",
    value: 7,
  },
  {
    text: "Platinum",
    value: 8,
  },
  {
    text: "Tourist10",
    value: 10,
  },
  {
    text: "Tourist15",
    value: 11,
  },
  {
    text: "Tourist20",
    value: 12,
  },
];

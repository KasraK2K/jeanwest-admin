//=========================================================================================================================
//
//   ####    #####     #####   ##   ##  #####          ####   #####   ##     ##   ####  ######    ###    ##     ##  ######
//  ##       ##  ##   ##   ##  ##   ##  ##  ##        ##     ##   ##  ####   ##  ##       ##     ## ##   ####   ##    ##
//  ##  ###  #####    ##   ##  ##   ##  #####         ##     ##   ##  ##  ## ##   ###     ##    ##   ##  ##  ## ##    ##
//  ##   ##  ##  ##   ##   ##  ##   ##  ##            ##     ##   ##  ##    ###     ##    ##    #######  ##    ###    ##
//   ####    ##   ##   #####    #####   ##             ####   #####   ##     ##  ####     ##    ##   ##  ##     ##    ##
//
//=========================================================================================================================

import { ActiveConstant } from "./active";
import { IPromotionGroup } from "@/interfaces/constant/group.interface";

export const DefaultPromotionGroupData: IPromotionGroup = {
  active: ActiveConstant,
  group: {
    eq: ["لباس", "کيف و کفش", "اکسسوري"],
  },
  subGroup: {
    eq: [
      "بلوز",
      "پانچو",
      "پك لباس خانگي",
      "پليور",
      "پيراهن",
      "تاپ",
      "تي شرت",
      "حلقه اي",
      "دامن",
      "مانتو",
      "ركابي",
      "ژاكت",
      "ساپورت",
      "ست",
      "شال",
      "شلوار",
      "شلوارك",
      "شوميز",
      "كاپشن",
      "كت و شلوار",
      "لباس شنا",
      "پالتو",
      "استرج",
      "بالشتك",
      "پتو",
      "جوراب",
      "چتر",
      "چمدان",
      "دستبند",
      "دستكش",
      "دستگاه پرزگير",
      "دفترچه",
      "زيور آلات",
      "ساعت",
      "شورت",
      "عينك",
      "كلاه",
      "كمربند",
      "ليوان",
      "صندل",
      "كفش",
      "كيف",
    ],
  },
  size: {
    ct: [
      "F",
      "L",
      "LA",
      "LB",
      "LC",
      "M",
      "MA",
      "MB",
      "MC",
      "S",
      "SA",
      "SB",
      "SC",
      "XL",
      "XLA",
      "XLB",
      "XLC",
      "XS",
      "XXL",
      "XXLA",
      "XXLB",
      "XXLC",
      "XXXL",
      "4XL",
      "3",
      "11",
      "12",
      "13",
      "14",
      "15",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "38",
      "40",
      "42",
      "43",
      "44",
      "99",
      "100",
      "110",
      "120",
      "130",
      "140",
      "150",
      "160",
      "1-2 سال",
      "2-3 سال",
      "3 سال",
      "3-4 سال",
      "4-5 سال",
      "10-11 سال",
      "11 سال",
      "11-12 سال",
      "12-13 سال",
      "13-14 سال",
      "4 سال",
      "5-6 سال",
      "6-7 سال",
      "7 سال",
      "7-8 سال",
      "8-9 سال",
      "8 سال",
      "9-10 سال",
      "26A",
      "26B",
      "27A",
      "27B",
      "28A",
      "28B",
      "29A",
      "29B",
      "30A",
      "30B",
      "31A",
      "31B",
      "32A",
      "32B",
      "34A",
      "34B",
      "36A",
      "36B",
      "38A",
      "38B",
      "تک سایز",
      "فری سایز",
      "250ml",
      "99",
      "120",
      "140",
      "F",
      "F1",
      "F2",
      "L",
      "M",
      "S",
      "XL",
      "XS",
      "XXL",
      "XXXL",
      "5-6 سال",
      "6-7 سال",
      "7-8 سال",
      "8 سال",
      "9-10 سال",
      "تک سایز",
      "فری سایز",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "F",
      "L",
      "M",
      "S",
      "XL",
      "XS",
      "XXL",
      "تک سایز",
    ],
  },
  gender: {
    eq: ["Women", "MEN", "Unisex"],
  },
  brand: {
    eq: ["Samuel & Kevin", "Baleno", "Jeanswest", "JootiJeans", "Casio"],
  },
  ageGroup: {
    eq: ["Adult", "Kids"],
  },
  colorFamily: {
    eq: [
      "سبز و شكاري نظامي",
      "سفيد و شيري و بژ",
      "قهوه اي و خاكي",
      "صورتي و بنفش",
      "سبزآبي و فيروزه اي",
      "زيتوني و جيد",
      "طوسي و مشكي",
      "نارنجي و قرمز و زرشكي",
      "زرد و خردلي",
      "تركيبي",
      "آبي و سرمه اي",
    ],
  },
};

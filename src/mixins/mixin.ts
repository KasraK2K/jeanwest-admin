import { tinyApiKey, tinyInit } from "@/mixins/tinymce.mixin";
import {
  numberToCash,
  toPersianString,
  toEnlishString,
} from "@/mixins/string.mixin";
import { toPersianTime, toGregorian } from "@/mixins/date.mixin";

export const methods = {
  methods: {
    tinyApiKey: tinyApiKey,
    tinyInit: tinyInit,
    numberToCash: numberToCash,
    toPersianString: toPersianString,
    toEnlishString: toEnlishString,
    toPersianTime: toPersianTime,
    toGregorian: toGregorian,
  },
};

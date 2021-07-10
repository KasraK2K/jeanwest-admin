import { tinyApiKey, tinyInit } from "@/mixin/tinymce.mixin";
import {
  numberToCash,
  toPersianString,
  toEnglishString,
} from "@/mixin/string.mixin";
import { toPersianTime, toGregorian, formatDate } from "@/mixin/date.mixin";
import { globals } from "@/common/globals/globals";

export const methods = {
  methods: {
    tinyApiKey: tinyApiKey,
    tinyInit: tinyInit,
    numberToCash: numberToCash,
    toPersianString: toPersianString,
    toEnglishString: toEnglishString,
    toPersianTime: toPersianTime,
    toGregorian: toGregorian,
    formatDate: formatDate,
    mediaPath: (path: string): string => {
      if (path.slice(0, 5) === "blob:") return path;
      else return globals.mediaServerStatic + path;
    },
  },
};

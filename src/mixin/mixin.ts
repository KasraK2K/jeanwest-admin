import { tinyApiKey, tinyInit } from "@/mixin/tinymce.mixin";
import {
  numberToCash,
  toPersianString,
  toEnglishString,
  toPlainText,
} from "@/mixin/string.mixin";
import {
  toPersianTime,
  toGregorian,
  formatDate,
  changeTimeZone,
} from "@/mixin/date.mixin";
import { globals } from "@/common/globals/globals";

export const methods = {
  methods: {
    tinyApiKey: tinyApiKey,
    tinyInit: tinyInit,
    numberToCash: numberToCash,
    toPersianString: toPersianString,
    toEnglishString: toEnglishString,
    toPlainText: toPlainText,
    toPersianTime: toPersianTime,
    toGregorian: toGregorian,
    changeTimeZone: changeTimeZone,
    formatDate: formatDate,
    mediaPath: (path: string): string => {
      if (path.slice(0, 5) === "blob:") return path;
      else return globals.mediaServerStatic + path;
    },
  },
};

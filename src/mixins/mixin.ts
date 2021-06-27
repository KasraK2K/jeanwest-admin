import { tinyApiKey, tinyInit } from "@/mixins/tinymce.mixin";
import {
  numberToCash,
  toPersianString,
  toEnlishString,
} from "@/mixins/string.mixin";
import { toPersianTime, toGregorian } from "@/mixins/date.mixin";
import { globals } from "@/common/globals/globals";

export const methods = {
  methods: {
    tinyApiKey: tinyApiKey,
    tinyInit: tinyInit,
    numberToCash: numberToCash,
    toPersianString: toPersianString,
    toEnlishString: toEnlishString,
    toPersianTime: toPersianTime,
    toGregorian: toGregorian,
    mediaPath: (path: string) => {
      if (path.slice(0, 5) === "blob:") return path;
      else return globals.mediaServerStatic + path;
    },
  },
};

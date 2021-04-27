import moment from "jalali-moment";

export const toPersianTime = (
  date: string,
  dateFormat?: string | undefined
): string =>
  moment(date)
    .locale("fa")
    .format(dateFormat ? dateFormat : "D MMM YYYY ساعت H:s");

// export const toGregorian = date => moment(date, "jYYYY/jMM/jDD").toISOString();
export const toGregorian = async (date: string): Promise<string> =>
  await moment
    .from(date, "fa", "YYYY/M/D HH:mm")
    .format("YYYY-M-D HH:mm:ss")
    .toString();

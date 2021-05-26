import moment from "jalali-moment";

export const toPersianTime = (
  date: string,
  dateFormat?: string | undefined
): string =>
  moment(date)
    .locale("fa")
    .format(dateFormat ? dateFormat : "YYYY/MM/DD - H:mm");

export const toGregorian = async (date: string): Promise<string> =>
  await moment
    .from(date, "fa", "YYYY/MM/DD HH:mm")
    .format("YYYY/MM/DD - H:mm")
    .toString();

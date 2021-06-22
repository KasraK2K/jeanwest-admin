import moment from "jalali-moment";

export const toPersianTime = (
  date: string,
  dateFormat?: string | undefined
): string | null => {
  return date
    ? moment(date)
        .locale("fa")
        .format(dateFormat ? dateFormat : "YYYY/MM/DD - HH:mm")
    : null;
};

export const toGregorian = async (date: string): Promise<string | null> => {
  return date
    ? await moment
        .from(date, "fa", "YYYY/MM/DD HH:mm")
        .locale("en")
        .format("YYYY/MM/DD - HH:mm")
        .toString()
    : null;
};

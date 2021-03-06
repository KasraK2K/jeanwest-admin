import moment from "jalali-moment";

export const toPersianTime = (
  date: string,
  dateFormat?: string | undefined
): string | null => {
  return date
    ? changeNotValidDate(date) ||
        moment(date)
          .locale("fa")
          .format(dateFormat ? dateFormat : "YYYY/MM/DD - HH:mm")
    : null;
};

export const toGregorian = async (date: string): Promise<string | null> => {
  return date
    ? (await changeNotValidDate(date)) ||
        moment
          .from(date, "fa", "YYYY/MM/DD HH:mm")
          .locale("en")
          .format("YYYY/MM/DD - HH:mm")
          .toString()
    : null;
};

export const changeTimeZone = (
  date: string,
  options: { from: string; fromFormat: string; to: string; toFormat: string }
): string => {
  return (
    changeNotValidDate(date) ||
    moment
      .from(date, options.from, options.fromFormat)
      .locale(options.to)
      .format(options.toFormat)
      .toString()
  );
};

export const formatDate = (
  date: string | Date,
  dateFormat = "YYYY-MM-DD"
): string => {
  return changeNotValidDate(date) || moment(date).format(dateFormat).toString();
};

export const changeNotValidDate = (date: string | Date): "-" | undefined => {
  const year = date.toString().slice(0, 4);
  if (year === "0000") return "-";
};

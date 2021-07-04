/* -------------------------------------------------------------------------- */
/*                           convert number to cash                           */
/* -------------------------------------------------------------------------- */
export const numberToCash: (number: number | string) => string | 0 = (
  number: number | string
) => {
  const cash = new Number(number).toLocaleString("fa-IR");
  return cash !== "ناعدد" ? cash : 0;
};

/* -------------------------------------------------------------------------- */
/*                  convert english number to persian number                  */
/* -------------------------------------------------------------------------- */
export const toPersianString: (sentence: string | number) => string = (
  sentence: string | number
) => {
  const map = new Map([
    ["0", "۰"],
    ["1", "۱"],
    ["2", "۲"],
    ["3", "۳"],
    ["4", "۴"],
    ["5", "۵"],
    ["6", "۶"],
    ["7", "۷"],
    ["8", "۸"],
    ["9", "۹"],
  ]);
  sentence = String(sentence);
  let faString = "";
  for (const character of sentence) {
    const mapedValue = map.get(character);
    if (mapedValue) faString += mapedValue;
    else faString += character;
  }
  return faString;
};

/* -------------------------------------------------------------------------- */
/*                  convert persian number to english number                  */
/* -------------------------------------------------------------------------- */
export const toEnglishString: (sentence: string) => string = (
  sentence: string
) => {
  const map = new Map([
    ["۰", "0"],
    ["۱", "1"],
    ["۲", "2"],
    ["۳", "3"],
    ["۴", "4"],
    ["۵", "5"],
    ["۶", "6"],
    ["۷", "7"],
    ["۸", "8"],
    ["۹", "9"],
  ]);
  sentence = String(sentence);
  let engString = "";
  for (const character of sentence) {
    const mapedValue = map.get(character);
    if (mapedValue) engString += mapedValue;
    else engString += character;
  }
  return engString;
};

const EQUAL_INDEX = 0;
const LESS_INDEX = -1;
const BIGGER_INDEX = 1;

export const compareTitles = (title1: string, title2: string) => {
  if (title1 < title2) {
    return LESS_INDEX;
  }

  if (title1 > title2) {
    return BIGGER_INDEX;
  }

  return EQUAL_INDEX;
};

import { TitleSort } from '@constants';

export const compareTitles = (title1: string, title2: string) => {
  if (title1 < title2) {
    return TitleSort.LESS_INDEX;
  }

  if (title1 > title2) {
    return TitleSort.BIGGER_INDEX;
  }

  return TitleSort.EQUAL_INDEX;
};

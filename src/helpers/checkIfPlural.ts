import { ONE_ITEM } from '@constants';

export const checkIfPlural = (text: string, count: number) => {
  return count > ONE_ITEM ? `${text}s` : text;
};

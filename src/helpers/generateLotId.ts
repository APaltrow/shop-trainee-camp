import { HASH_DIVIDER } from '@constants';

export const generateLotId = (hashItems: string[]) => {
  return hashItems.join(HASH_DIVIDER);
};

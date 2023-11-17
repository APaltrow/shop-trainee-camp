import { SPECIAL_CHARACTERS } from '@constants';

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (SPECIAL_CHARACTERS.includes(e.key)) {
    e.preventDefault();
  }
};

import { MIN_GAP, WIDTH_DIFFERENCE_INDEX, ZERO_POSITION } from '@constants';

export const getSliderPosition = (position: number, disabled: boolean) => {
  const isZeroPosition = !(position - MIN_GAP > ZERO_POSITION);

  const correctedPosition = position - WIDTH_DIFFERENCE_INDEX;

  return !isZeroPosition && !disabled ? correctedPosition : ZERO_POSITION;
};

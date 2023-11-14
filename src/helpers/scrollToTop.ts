import { SMOOTH_BEHAVIOR, TOP_POSITION } from '@constants';

export const scrollToTop = () => {
  window.scrollTo({
    top: TOP_POSITION,
    behavior: SMOOTH_BEHAVIOR,
  });
};

const TOP_POSITION = 0;
const SMOOTH_BEHAVIOR = 'smooth';

export const scrollToTop = () => {
  window.scrollTo({
    top: TOP_POSITION,
    behavior: SMOOTH_BEHAVIOR,
  });
};

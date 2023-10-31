import { MediaBreakpoints } from '@constants';

export const checkDeviceWidth = (deviceWidth: MediaBreakpoints) => {
  return window.matchMedia(`(max-width: ${deviceWidth})`).matches;
};

import { useEffect } from 'react';
import { MOUSEWHEEL_EVENT, SCROLL_EVENT, TOUCHMOVE_EVENT } from '@constants';

export const useNoScroll = (isNoScroll: boolean) => {
  useEffect(() => {
    const pos = Math.trunc(window.scrollY);

    const disableScroll = () => {
      if (!isNoScroll) return;

      window.scrollTo({
        top: pos,
      });
    };

    document.addEventListener(SCROLL_EVENT, disableScroll, false);
    document.addEventListener(MOUSEWHEEL_EVENT, disableScroll, false);
    document.addEventListener(TOUCHMOVE_EVENT, disableScroll, false);

    return () => {
      document.removeEventListener(SCROLL_EVENT, disableScroll);
      document.removeEventListener(MOUSEWHEEL_EVENT, disableScroll);
      document.removeEventListener(TOUCHMOVE_EVENT, disableScroll);
    };
  }, [isNoScroll]);
};

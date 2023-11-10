import { useEffect } from 'react';

import { NO_SCROLL_CLASS } from '@constants';

export const useNoScroll = (isNoScroll: boolean) => {
  useEffect(() => {
    if (isNoScroll) {
      document.body.classList.add(NO_SCROLL_CLASS);
    } else {
      document.body.classList.remove(NO_SCROLL_CLASS);
    }
  }, [isNoScroll]);
};

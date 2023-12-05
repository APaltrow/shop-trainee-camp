import { useEffect } from 'react';

export const useNoScroll = (isNoScroll: boolean) => {
  useEffect(() => {
    const pos = Math.trunc(window.scrollY);

    const disableScroll = () => {
      window.scrollTo({
        top: pos,
      });
    };

    window.onscroll = isNoScroll ? disableScroll : () => {};

    return () => {
      window.onscroll = () => {};
    };
  }, [isNoScroll]);
};

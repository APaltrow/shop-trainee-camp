import { useEffect, useRef } from 'react';

import { CLICK_EVENT } from '@constants';

export const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };
    document.body.addEventListener(CLICK_EVENT, handleClickOutside);
    return () => {
      document.body.removeEventListener(CLICK_EVENT, handleClickOutside);
    };
  }, []);

  return ref;
};

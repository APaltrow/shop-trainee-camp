import { useCallback, useRef } from 'react';

export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  const timer = useRef<null | NodeJS.Timeout>(null);

  const debounced = useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debounced;
};

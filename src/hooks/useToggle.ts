import { useState } from 'react';

export const useToggle = () => {
  const [isOpened, setOpened] = useState(false);

  const toggle = () => {
    setOpened((prev) => !prev);
  };

  const onClose = () => {
    setOpened(false);
  };

  const onOpen = () => {
    setOpened(true);
  };

  return {
    isOpened,

    toggle,
    onClose,
    onOpen,
  };
};

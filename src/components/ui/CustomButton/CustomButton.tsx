import { FC, ReactNode } from 'react';

import { ButtonSizes, ButtonVariants } from '@constants';

import style from './CustomButton.module.scss';

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  size?: ButtonSizes;
  variant?: ButtonVariants;

  onClick: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled,
  size = ButtonSizes.DEFAULT,
  variant = ButtonVariants.DEFAULT,

  onClick,
}) => {
  const classes = `${style.button} ${style[`size_${size}`]} ${
    style[`variant_${variant}`]
  }`;
  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

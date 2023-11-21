import { FC } from 'react';

import style from './BinarySection.module.scss';

interface BinarySectionProps {
  leftElement: JSX.Element;
  rightElement: JSX.Element;
  isWrapping?: boolean;
}

export const BinarySection: FC<BinarySectionProps> = ({
  leftElement,
  rightElement,
  isWrapping = false,
}) => {
  return (
    <div className={`${style.container} ${isWrapping ? style.wrapping : ''}`}>
      <div className={style.left_el}>{leftElement}</div>
      <div className={style.right_el}>{rightElement}</div>
    </div>
  );
};

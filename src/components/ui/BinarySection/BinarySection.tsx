import { FC } from 'react';

import style from './BinarySection.module.scss';

interface BinarySectionProps {
  leftElement: JSX.Element;
  rightElement: JSX.Element;
}

export const BinarySection: FC<BinarySectionProps> = ({
  leftElement,
  rightElement,
}) => {
  return (
    <div className={style.container}>
      <div className={style.left_el}>{leftElement}</div>
      <div className={style.right_el}>{rightElement}</div>
    </div>
  );
};

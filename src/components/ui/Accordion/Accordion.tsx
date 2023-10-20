import { FC, ReactNode, useState } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Accordion.module.scss';

export enum AccordionPositions {
  BOTTOM = 'bottom',
  RIGHT = 'right',
}

interface AccordionProps {
  children: ReactNode;
  title?: string;
  isVisible?: boolean;
  position?: AccordionPositions;
}

export const Accordion: FC<AccordionProps> = ({
  children,
  isVisible,
  title,
  position = AccordionPositions.BOTTOM,
}) => {
  const [isExpanded, setExpanded] = useState(!!isVisible);

  const buttonClasses = `${style.expand_btn} ${
    isExpanded ? style.rotate : ''
  } ${style[`position_${position}`]}`;

  const handleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className={style.container}>
      {title ? <h4 className={style.title}>{title}</h4> : null}
      <div className={`${style.content} ${isExpanded ? style.expanded : ''}`}>
        {children}
      </div>

      <span className={buttonClasses}>
        <button
          type="button"
          onClick={handleExpand}
        >
          <Icon iconName={IconsTypes.ARROW_DOWN} />
        </button>
      </span>
    </div>
  );
};

import { FC, ReactNode, useState } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Accordion.module.scss';

interface AccordionProps {
  children: ReactNode;
  isVisible?: boolean;
}

export const Accordion: FC<AccordionProps> = ({ children, isVisible }) => {
  const [isExpanded, setExpanded] = useState(!!isVisible);

  const handleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className={style.container}>
      <div className={`${style.content} ${isExpanded ? style.expanded : ''}`}>
        {children}
      </div>

      <span className={`${style.expand_btn} ${isExpanded ? style.rotate : ''}`}>
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

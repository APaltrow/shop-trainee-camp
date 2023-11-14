import { FC, ReactNode, useState } from 'react';

import { IconSizes, IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Accordion.module.scss';

interface AccordionProps {
  children: ReactNode;
  title?: string;
  isVisible?: boolean;
}

export const Accordion: FC<AccordionProps> = ({
  children,
  isVisible,
  title,
}) => {
  const [isExpanded, setExpanded] = useState(!!isVisible);

  const handleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className={style.container}>
      {!!title && <h4 className={style.title}>{title}</h4>}
      <div className={`${style.content} ${isExpanded ? style.expanded : ''}`}>
        {children}
      </div>

      <button
        type="button"
        onClick={handleExpand}
        className={`${style.expand_btn} ${isExpanded ? style.rotate : ''}`}
      >
        <Icon
          iconName={IconsTypes.ARROW_DOWN}
          size={IconSizes.SMALL}
        />
      </button>
    </div>
  );
};

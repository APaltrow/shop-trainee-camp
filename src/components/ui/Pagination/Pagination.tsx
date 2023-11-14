import { FC, useEffect, useState } from 'react';

import { IPage } from '@types';
import {
  DEFAULT_COEFICIENT,
  DEFAULT_SECTION,
  IconsTypes,
  PAGES_PER_SECTION,
  ZERO_INDEX,
} from '@constants';
import { CustomButton, Icon } from '@components';

import style from './Pagination.module.scss';

interface PaginationProps {
  pagesList: IPage[];
  activePage: number;

  onActivePageChange: (pageNumber: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  pagesList,
  activePage,

  onActivePageChange,
}) => {
  const [coeficient, setCoeficient] = useState(DEFAULT_COEFICIENT);
  const [currentSection, setCurrentSection] = useState(DEFAULT_SECTION);

  const sections = Math.ceil(pagesList.length / PAGES_PER_SECTION);

  const pages = pagesList.slice(
    ZERO_INDEX + coeficient,
    PAGES_PER_SECTION + coeficient,
  );

  const isMultipleSections = sections > DEFAULT_SECTION;
  const isPrevious = isMultipleSections && currentSection > DEFAULT_SECTION;
  const isNext = isMultipleSections && currentSection < sections;

  const onPreviousClick = () => {
    setCurrentSection((prev) => prev - DEFAULT_SECTION);
    setCoeficient((prev) => prev - PAGES_PER_SECTION);
  };

  const onNextClick = () => {
    setCurrentSection((prev) => prev + DEFAULT_SECTION);
    setCoeficient((prev) => prev + PAGES_PER_SECTION);
  };

  useEffect(() => {
    setCoeficient(DEFAULT_COEFICIENT);
    setCurrentSection(DEFAULT_SECTION);
  }, [pagesList]);

  return (
    <ul className={style.list}>
      {isPrevious && (
        <li className={style.prev_btn}>
          <CustomButton onClick={onPreviousClick}>
            <Icon iconName={IconsTypes.ARROW_DOWN} />
          </CustomButton>
        </li>
      )}

      {pages.map(({ number }) => (
        <li
          key={`page_${number}`}
          className={`${number === activePage ? style.disabled : ''}`}
        >
          <CustomButton onClick={() => onActivePageChange(number)}>
            <span className={style.btn_text}>{number}</span>
          </CustomButton>
        </li>
      ))}

      {isNext && (
        <li className={style.next_btn}>
          <CustomButton onClick={onNextClick}>
            <Icon iconName={IconsTypes.ARROW_DOWN} />
          </CustomButton>
        </li>
      )}
    </ul>
  );
};

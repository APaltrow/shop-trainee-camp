import { FC, ReactNode } from 'react';

import { CustomButton, Icon } from '@components';
import { IconSizes, IconsTypes } from '@constants';
import { useCarousel } from '@hooks';

import style from './Carousel.module.scss';

interface CarouselProps {
  children: ReactNode;
}

export const Carousel: FC<CarouselProps> = ({ children }) => {
  const {
    offset,
    carouselRef,
    carouselContentRef,

    isPrevVisible,
    isNextVisible,

    onSlidePrevClick,
    onSlideNextClick,
  } = useCarousel();

  return (
    <div
      className={style.carousel_container}
      ref={carouselRef}
    >
      <ul
        className={style.carousel}
        ref={carouselContentRef}
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {children}
      </ul>

      {isPrevVisible && (
        <span className={style.prev_btn}>
          <CustomButton onClick={onSlidePrevClick}>
            <span className={style.arrow_icon}>
              <Icon
                iconName={IconsTypes.ARROW_DOWN}
                size={IconSizes.LARGE}
              />
            </span>
          </CustomButton>
        </span>
      )}

      {isNextVisible && (
        <span className={style.next_btn}>
          <CustomButton onClick={onSlideNextClick}>
            <span className={style.arrow_icon}>
              <Icon
                iconName={IconsTypes.ARROW_DOWN}
                size={IconSizes.LARGE}
              />
            </span>
          </CustomButton>
        </span>
      )}
    </div>
  );
};

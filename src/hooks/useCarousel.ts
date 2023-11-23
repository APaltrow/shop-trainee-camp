import { useEffect, useRef, useState } from 'react';

import { CarouselConstants } from '@constants';

export const useCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselContentRef = useRef<HTMLUListElement | null>(null);

  const [offset, setOffset] = useState(CarouselConstants.INITIAL_OFFSET);
  const [isPrevVisible, setPrevVisible] = useState(false);
  const [isNextVisible, setNextVisible] = useState(false);

  const element = carouselContentRef?.current?.firstChild
    ? (carouselContentRef.current.firstChild as HTMLElement)
    : null;

  const childWidth = element
    ? element.offsetWidth
    : CarouselConstants.INITIAL_OFFSET;

  const carouselStep = childWidth + CarouselConstants.GAP;

  const getContainerWidth = () => {
    if (!carouselRef.current) return CarouselConstants.INITIAL_OFFSET;

    return carouselRef.current.offsetWidth;
  };

  const getContentWidth = () => {
    if (!carouselContentRef.current) return CarouselConstants.INITIAL_OFFSET;

    return carouselContentRef.current.scrollWidth;
  };

  const onSlidePrevClick = () => {
    setOffset((prev) => {
      const newOffset = prev - carouselStep;
      const isContentEnd = newOffset + getContainerWidth() >= getContentWidth();

      if (newOffset > CarouselConstants.INITIAL_OFFSET) {
        setPrevVisible(true);
      } else {
        setPrevVisible(false);
      }

      if (isContentEnd) {
        setNextVisible(false);
      } else {
        setNextVisible(true);
      }

      return newOffset;
    });
  };

  const onSlideNextClick = () => {
    setOffset((prev) => {
      const newOffset = prev + carouselStep;
      const offsetWithDiff = newOffset + CarouselConstants.OFFSET_MOBILE_DIFF;
      const contentWidthDiff = getContentWidth() - getContainerWidth();

      const isContentEnd = offsetWithDiff >= contentWidthDiff;

      if (newOffset > CarouselConstants.INITIAL_OFFSET) {
        setPrevVisible(true);
      } else {
        setPrevVisible(false);
      }

      if (isContentEnd) {
        setNextVisible(false);
      } else {
        setNextVisible(true);
      }

      return newOffset;
    });
  };

  useEffect(() => {
    if (!getContainerWidth()) return;
    if (!getContentWidth()) return;

    if (getContentWidth() < getContainerWidth()) {
      setNextVisible(false);
    } else {
      setNextVisible(true);
    }
  }, [
    carouselRef.current?.offsetWidth,
    carouselContentRef.current?.scrollWidth,
  ]);

  return {
    offset,
    carouselRef,
    carouselContentRef,

    isPrevVisible,
    isNextVisible,

    onSlidePrevClick,
    onSlideNextClick,
  };
};

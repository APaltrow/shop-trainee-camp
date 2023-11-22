import { useEffect, useRef, useState } from 'react';

const INITIAL_OFFSET = 0;
const CAROUSEL_GAP = 32;

export const useCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselContentRef = useRef<HTMLUListElement | null>(null);

  const [offset, setOffset] = useState(INITIAL_OFFSET);
  const [isPrevVisible, setPrevVisible] = useState(false);
  const [isNextVisible, setNextVisible] = useState(false);

  const element = carouselContentRef?.current?.firstChild
    ? (carouselContentRef.current.firstChild as HTMLElement)
    : INITIAL_OFFSET;

  const childWidth = element ? element.offsetWidth : INITIAL_OFFSET;

  const carouselStep = childWidth + CAROUSEL_GAP;

  const getContainerWidth = () => {
    if (!carouselRef.current) return INITIAL_OFFSET;

    return carouselRef.current.offsetWidth;
  };

  const getContentWidth = () => {
    if (!carouselContentRef.current) return INITIAL_OFFSET;

    return carouselContentRef.current.scrollWidth;
  };

  const onSlidePrevClick = () => {
    setOffset((prev) => {
      const newOffset = prev - carouselStep;
      const isContentEnd = newOffset + getContainerWidth() >= getContentWidth();

      if (newOffset > INITIAL_OFFSET) {
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
      const isContentEnd = newOffset + getContainerWidth() >= getContentWidth();

      if (newOffset > INITIAL_OFFSET) {
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

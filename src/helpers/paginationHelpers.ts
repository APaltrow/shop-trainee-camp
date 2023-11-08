import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_NAME,
  SHOWMORE_AMOUNT,
  ZERO_PAGES,
} from '@constants';
import { IPage } from '@types';

export const getPagesRecord = (pagesList: string[], itemsCount: number) => {
  return pagesList.map((_, idx) => {
    const number = idx + 1;
    const start = DEFAULT_ITEMS_PER_PAGE * idx;
    let end = start + DEFAULT_ITEMS_PER_PAGE;

    if (end > itemsCount) {
      end = itemsCount;
    }

    return {
      number,
      range: {
        start,
        end,
      },
    };
  });
};

export const getUpdatedPagesRecord = (
  pagesRecord: IPage[],
  pageNumber: number,
  itemsCount: number,
) => {
  const newRecord = pagesRecord.map((page) => {
    if (!page) return null;
    if (pageNumber > page.number) return page;

    if (pageNumber === page.number) {
      page.range.end += SHOWMORE_AMOUNT;

      if (page.range.end > itemsCount) {
        page.range.end = itemsCount;
      }

      return page;
    }

    page.range.start += SHOWMORE_AMOUNT;
    page.range.end += SHOWMORE_AMOUNT;

    if (page.range.start > itemsCount) return null;

    if (page.range.end > itemsCount) {
      page.range.end = itemsCount;
    }

    if (page.range.start === page.range.end) return null;
    return page;
  });

  return newRecord.filter((page) => !!page) as IPage[];
};

export const getPagesList = (itemsCount: number, itemsPerPage: number) => {
  const pagesCount = itemsCount / itemsPerPage || ZERO_PAGES;
  const pagesList = new Array(Math.ceil(pagesCount)).fill(DEFAULT_NAME);

  return pagesCount ? pagesList : [];
};

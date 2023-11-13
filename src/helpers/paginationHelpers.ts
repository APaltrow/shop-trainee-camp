import {
  ARRAY_INDEX_DIFF,
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE_NAME,
  SHOWMORE_AMOUNT,
  ZERO_INDEX,
  ZERO_PAGES,
} from '@constants';
import { IPage } from '@types';
import { generateArray } from '@helpers';

export const getPagesRecord = (itemsCount: number) => {
  const pagesCount =
    Math.ceil(itemsCount / DEFAULT_ITEMS_PER_PAGE) || ZERO_PAGES;

  const pagesList = pagesCount
    ? generateArray(pagesCount, DEFAULT_PAGE_NAME)
    : [];

  return pagesList.map((_, idx) => {
    const number = idx + ARRAY_INDEX_DIFF;
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
  activePageNumber: number,
  itemsTotalCount: number,
) => {
  return pagesRecord.reduce((record, page) => {
    if (activePageNumber > page.number) return [...record, page];

    if (activePageNumber === page.number) {
      page.range.end += SHOWMORE_AMOUNT;

      if (page.range.end > itemsTotalCount) {
        page.range.end = itemsTotalCount;
      }

      return [...record, page];
    }

    page.range.start += SHOWMORE_AMOUNT;
    page.range.end += SHOWMORE_AMOUNT;

    if (page.range.start > itemsTotalCount) return record;

    if (page.range.end > itemsTotalCount) {
      page.range.end = itemsTotalCount;
    }

    if (page.range.start === page.range.end) return record;

    return [...record, page];
  }, [] as IPage[]);
};

export const getPaginatedList = <T>(
  pagesList: IPage[],
  list: T[],
  activePage: number,
) => {
  const activePageItem = pagesList[activePage - ARRAY_INDEX_DIFF] || null;

  if (!activePageItem) return list;

  const startIndex = activePageItem?.range?.start || ZERO_INDEX;
  const endIndex = activePageItem?.range?.end || ZERO_INDEX;

  return list.slice(startIndex, endIndex);
};

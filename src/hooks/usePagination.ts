import { useEffect, useState } from 'react';

import { IPage } from '@types';
import { DEFAULT_ACTIVE_PAGE, DEFAULT_ITEMS_PER_PAGE } from '@constants';
import { getPagesList, getPagesRecord, getUpdatedPagesRecord } from '@helpers';

export const usePagination = (itemsCount: number) => {
  const [activePage, setActivePage] = useState(DEFAULT_ACTIVE_PAGE);
  const [pagesRecord, setPagesRecord] = useState<IPage[]>(
    getPagesRecord(
      getPagesList(itemsCount, DEFAULT_ITEMS_PER_PAGE),
      itemsCount,
    ),
  );

  const isShowMoreVisible = activePage === pagesRecord.length;

  const onActivePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const onShowMore = (pageNumber: number) => {
    const newRecord = getUpdatedPagesRecord(
      pagesRecord,
      pageNumber,
      itemsCount,
    );

    setPagesRecord(newRecord);
  };

  useEffect(() => {
    const initialPagesRecord = getPagesRecord(
      getPagesList(itemsCount, DEFAULT_ITEMS_PER_PAGE),
      itemsCount,
    );
    setPagesRecord(initialPagesRecord);
  }, [itemsCount]);

  return {
    activePage,
    isShowMoreVisible,
    pagesList: pagesRecord,

    onActivePageChange,
    onShowMore,
  };
};

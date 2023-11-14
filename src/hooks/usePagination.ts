import { useEffect, useState } from 'react';

import { IPage } from '@types';
import { DEFAULT_ACTIVE_PAGE } from '@constants';
import { getPagesRecord, getUpdatedPagesRecord, scrollToTop } from '@helpers';

export const usePagination = (itemsCount: number, resetDeps: unknown[]) => {
  const [activePage, setActivePage] = useState(DEFAULT_ACTIVE_PAGE);
  const [pagesRecord, setPagesRecord] = useState<IPage[]>(
    getPagesRecord(itemsCount),
  );

  const isShowMoreVisible =
    !!pagesRecord.length && activePage !== pagesRecord.length;

  const onActivePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
    scrollToTop();
  };

  const onShowMore = (activePageNumber: number) => {
    const updatedRecord = getUpdatedPagesRecord(
      pagesRecord,
      activePageNumber,
      itemsCount,
    );

    setPagesRecord(updatedRecord);
  };

  useEffect(() => {
    setPagesRecord(getPagesRecord(itemsCount));
    onActivePageChange(DEFAULT_ACTIVE_PAGE);
  }, [...resetDeps]);

  return {
    activePage,
    isShowMoreVisible,
    pagesList: pagesRecord,

    onActivePageChange,
    onShowMore,
  };
};

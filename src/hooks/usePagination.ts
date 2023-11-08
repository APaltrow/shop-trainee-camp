import { useState } from 'react';

const DEFAULT_NAME = 'page';
const DEFAULT_ACTIVE_PAGE = 1;

const DEFAULT_ITEMS_PER_PAGE = 5;

export const usePagination = (itemsCount: number) => {
  const [activePage, setActivePage] = useState(DEFAULT_ACTIVE_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const pagesCount = itemsCount / itemsPerPage || 0;

  const pagesList = pagesCount
    ? new Array(Math.ceil(pagesCount)).fill(DEFAULT_NAME)
    : [];

  const onActivePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const onItemsPerPageChange = () => {
    setItemsPerPage((prev) => prev + DEFAULT_ITEMS_PER_PAGE);
  };

  return {
    activePage,
    pagesList,
    itemsPerPage,

    onActivePageChange,
    onItemsPerPageChange,
  };
};

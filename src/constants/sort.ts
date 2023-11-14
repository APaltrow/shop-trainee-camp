export enum SortProperty {
  PRICE = 'price',
  RATING = 'rating',
  TITLE = 'title',
  NO_SORT = 'select',
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export enum TitleSort {
  EQUAL_INDEX = 0,
  LESS_INDEX = -1,
  BIGGER_INDEX = 1,
}

export const SORT_OPTIONS = [
  SortProperty.PRICE,
  SortProperty.RATING,
  SortProperty.TITLE,
];

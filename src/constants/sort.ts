export enum SortProperty {
  PRICE = 'price',
  RATING = 'rating',
  NO_SORT = 'select',
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export const SORT_OPTIONS = [SortProperty.PRICE, SortProperty.RATING];

export enum ErrorsMessages {
  DEFAULT = 'Something went wrong ...',
  TRY_AGAIN = 'Please, try again later',
  NO_RESULTS = 'No results ...',
  NOT_FOUND = 'Not found',
  CONTACT_SUPPORT = 'Looks like an error occured, please try to contact support team.',
  PRODUCT_DOES_NOT_EXIST = 'Looks like the product you are looking for is not found or does not exist...',
}

export enum PriceErrors {
  DEFAULT = '',
  MAX_EXCEED = 'Max price should not exceed',
  MAX_BELOW = 'Max price cannot be less than',
  MIN_EXCEED = 'Min price cannot exceed',
  MIN_BELOW = 'Min price cannot be less than',
}

export enum UnitsErrors {
  NO_ERROR = '',
  INVALID_AMOUNT = 'Invalid units amount',
  TOTAL_EXCEED = 'Total should not exceed',
}

export enum ValidationsErrors {
  NO_ERROR = '',
  EMPTY_FIELD = 'Field cannot be empty',
  MIN_LENGTH = 'Min length should be',
  MAX_LENGTH = 'Max length should be',
  INVALID_EMAIL = 'Invalid email',
  INVALID_PHONE = 'Invalid phone number',
  NUMBERS_ONLY = 'Should be numbers only',
  INVALID_ADDRESS = 'Street name and number required',
}

export enum AutocompleteErrors {
  NO_ERROR = '',
  INCORRECT_CITY = 'Incorrect city name',
  INCORRECT_COUNTRY = 'Incorrect country name',
  INCORRECT_STATE = 'Incorrect state name',
}

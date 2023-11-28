import { Validations } from '@hooks';

export enum ValidationTypes {
  EMPTY = 'isEmpty',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  EMAIL = 'isEmail',
  NUMBERS_ONLY = 'isNumbersOnly',
  ADDRESS = 'isAddress',
}

export const BILLING_FORM_VALIDATIONS: Record<string, Validations> = {
  firstName: {
    [ValidationTypes.EMPTY]: true,
    [ValidationTypes.MAX_LENGTH]: 15,
  },
  lastName: {
    [ValidationTypes.EMPTY]: true,
    [ValidationTypes.MAX_LENGTH]: 15,
  },
  email: {
    [ValidationTypes.EMPTY]: true,
    [ValidationTypes.EMAIL]: true,
  },
  phoneNumber: {
    [ValidationTypes.EMPTY]: true,
    [ValidationTypes.NUMBERS_ONLY]: true,
    [ValidationTypes.MIN_LENGTH]: 7,
    [ValidationTypes.MAX_LENGTH]: 15,
  },
  address: {
    [ValidationTypes.EMPTY]: true,
    [ValidationTypes.ADDRESS]: true,
  },
  townOrCity: {
    [ValidationTypes.EMPTY]: true,
  },
  stateOrCountry: {
    [ValidationTypes.EMPTY]: true,
  },
  zipOrPostalCode: {
    [ValidationTypes.EMPTY]: true,
    [ValidationTypes.NUMBERS_ONLY]: true,
    [ValidationTypes.MIN_LENGTH]: 6,
    [ValidationTypes.MAX_LENGTH]: 6,
  },
  orderNotes: {
    [ValidationTypes.MAX_LENGTH]: 100,
  },
};

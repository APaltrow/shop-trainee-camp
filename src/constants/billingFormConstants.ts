import { ValidationsErrors } from './errorMessages';

export enum BillingFormInfo {
  BILLING_LEGEND = 'Billing info',
  BILLING_INFO = 'Please enter your billing info',
  INFORMATIONS_LEGEND = 'Additional informations',
  INFORMATIONS_INFO = 'Need something else? We will make it for you!',
  CONFIRMATION_LEGEND = 'Confirmation',
  CONFIRMATION_INFO = 'We are getting to the end. Just few clicks and your order is ready!',
  AGREEMENT = 'I agree with sending a Marketing and newsletter emails. No spam, promissed!',
  ORDER_NOTES_PLACEHOLDER = 'Need a specific delivery day? Sending a gitf? Let’s say ...',
  ORDER_NOTES_LABEL = 'Order notes',
}

export enum BillingFormInputs {
  ORDER_NOTES = 'orderNotes',
  MARKETING_AGREEMENT = 'marketingAgreement',
  TERMS_OF_USE = 'termsOfUse',
}

export const BILLING_FORM_INPUTS = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'First name',
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Last name',
  },
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    placeholder: 'Email address',
  },
  {
    label: 'Phone number',
    name: 'phoneNumber',
    type: 'tel',
    placeholder: 'Phone number',
  },
  {
    label: 'State / Country',
    name: 'stateOrCountry',
    type: 'text',
    placeholder: 'Choose a state or Country',
  },
  {
    label: 'Town / City',
    name: 'townOrCity',
    type: 'text',
    placeholder: 'Town or city',
  },
  {
    label: 'Address',
    name: 'address',
    type: 'text',
    placeholder: 'Address',
  },
  {
    label: 'ZIP / Postal code',
    name: 'zipOrPostalCode',
    type: 'text',
    placeholder: 'Postal code or ZIP',
  },
];

export const INITIAL_BILLING_FORM_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  townOrCity: '',
  stateOrCountry: '',
  zipOrPostalCode: '',

  orderNotes: '',

  termsOfUse: false,
  marketingAgreement: false,
};

export const INITIAL_BILLING_FORM_ERRORS = {
  firstName: ValidationsErrors.EMPTY_FIELD,
  lastName: ValidationsErrors.EMPTY_FIELD,
  email: ValidationsErrors.EMPTY_FIELD,
  phoneNumber: ValidationsErrors.EMPTY_FIELD,
  address: ValidationsErrors.EMPTY_FIELD,
  townOrCity: ValidationsErrors.EMPTY_FIELD,
  stateOrCountry: ValidationsErrors.EMPTY_FIELD,
  zipOrPostalCode: ValidationsErrors.EMPTY_FIELD,

  orderNotes: '',
};

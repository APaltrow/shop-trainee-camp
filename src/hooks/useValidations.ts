import { useState } from 'react';

import { Validations } from '@types';
import {
  ZERO_INDEX,
  EMAIL_VALIDATOR,
  NUMBERS_VALIDATOR,
  ValidationsErrors,
  ValidationTypes,
  ADDRESS_VALIDATOR,
} from '@constants';

export const useValidations = (initialErrors: Record<string, string>) => {
  const [errors, setErrors] = useState(initialErrors);

  const validateInput = (
    name: string,
    value: string,
    validations: Validations,
  ) => {
    const errorsList: string[] = [];

    Object.entries(validations).forEach(([validationName, validationValue]) => {
      switch (validationName) {
        case ValidationTypes.EMPTY: {
          if (!value) {
            errorsList.push(ValidationsErrors.EMPTY_FIELD);
          }

          break;
        }

        case ValidationTypes.MIN_LENGTH: {
          const isLengthSmaller = value.length < +validationValue;

          if (isLengthSmaller) {
            errorsList.push(
              `${ValidationsErrors.MIN_LENGTH} ${validationValue}`,
            );
          }

          break;
        }

        case ValidationTypes.MAX_LENGTH: {
          const isLengthExceeded = value.length > +validationValue;

          if (isLengthExceeded) {
            errorsList.push(
              `${ValidationsErrors.MAX_LENGTH} ${validationValue}`,
            );
          }

          break;
        }

        case ValidationTypes.EMAIL: {
          const isInvalidEmail = !EMAIL_VALIDATOR.test(
            String(value).toLowerCase(),
          );

          if (isInvalidEmail) {
            errorsList.push(ValidationsErrors.INVALID_EMAIL);
          }

          break;
        }

        case ValidationTypes.NUMBERS_ONLY: {
          const isNumbersOnly = NUMBERS_VALIDATOR.test(value);

          if (!isNumbersOnly) {
            errorsList.push(ValidationsErrors.NUMBERS_ONLY);
          }

          break;
        }

        case ValidationTypes.ADDRESS: {
          const isAddress = ADDRESS_VALIDATOR.test(value);

          if (!isAddress) {
            errorsList.push(ValidationsErrors.INVALID_ADDRESS);
          }

          break;
        }

        default: {
          break;
        }
      }
    });

    const inputError = errorsList.length
      ? errorsList[ZERO_INDEX]
      : ValidationsErrors.NO_ERROR;

    setErrors((prev) => ({ ...prev, [name]: inputError }));
  };

  return {
    errors,

    validateInput,
  };
};

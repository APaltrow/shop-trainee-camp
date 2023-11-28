import { ChangeEvent, useState } from 'react';

import { TYPE_CHECKBOX } from '@constants';
import { Validations, useValidations } from '@hooks';

export type FormInputEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type FormValues = Record<string, string | boolean>;
export type FormValidations = Record<string, Validations>;
export type FormErrors = Record<string, string>;

export const useForm = (
  initialValues: FormValues,
  validations: FormValidations,
  initialErrors: FormErrors,
) => {
  const [formValues, setFormValues] = useState(initialValues);

  const {
    errors,

    validateInput,
  } = useValidations(initialErrors);

  const onInputChange = (e: FormInputEvent) => {
    const { name, value, type } = e.target;

    if (type === TYPE_CHECKBOX) {
      const textAreaEvent = e as ChangeEvent<HTMLInputElement>;
      const { checked } = textAreaEvent.target;
      setFormValues((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    const inputValidations = validations[name];

    validateInput(name, value, inputValidations);

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = () => {
    window.alert('Form has been submitted successfully!!!');
  };

  return {
    formValues,
    errors,

    onInputChange,
    onFormSubmit,
  };
};

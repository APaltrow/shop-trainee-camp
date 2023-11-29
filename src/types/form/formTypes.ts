import { ChangeEvent } from 'react';

import { Validations } from './validationsTypes';

export type FormInputEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type FormValues = Record<string, string | boolean>;
export type FormValidations = Record<string, Validations>;
export type FormErrors = Record<string, string>;

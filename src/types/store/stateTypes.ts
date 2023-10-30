import { ErrorsMessages } from '@constants';

export interface IState {
  isLoading: boolean;
  error: null | ErrorsMessages | string;
}

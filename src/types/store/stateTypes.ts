import { ErrorsMessages } from '@constants';

export interface IState {
  isLoading: boolean;
  error: ErrorsMessages | string | null;
}

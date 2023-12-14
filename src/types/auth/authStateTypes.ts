import { IUser } from './userTypes';

export interface AuthState {
  user: IUser | null;
  isAuth: boolean;
}

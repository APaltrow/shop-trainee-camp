import { useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { useActions } from '@redux';
import { FIREBASE_CONFIG, NavigationPaths } from '@constants';

interface AuthResult extends UserCredential {
  _tokenResponse: {
    firstName: string;
    lastName: string;
  };
}

export const useFirebase = () => {
  const navigate = useNavigate();
  const { login, logout } = useActions();
  const location = useLocation();

  const app = initializeApp(FIREBASE_CONFIG);

  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();

  const onLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user, _tokenResponse: info } = result as AuthResult;

      const userData = {
        photoURL: user.photoURL || '',
        email: user.email || '',
        displayName: user.displayName || '',
        firstName: info.firstName || '',
        lastName: info.lastName || '',
      };

      login(userData);
      navigate(location?.state?.prevUrl || NavigationPaths.HOME);
    } catch (error) {
      logout();
    }
  };

  const onLogout = async () => {
    try {
      await signOut(auth);
      logout();
    } catch (error) {
      logout();
    } finally {
      logout();
    }
  };

  return {
    app,

    onLogin,
    onLogout,
  };
};

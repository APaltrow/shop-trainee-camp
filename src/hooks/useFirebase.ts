import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth';

import { useActions } from '@redux';
import { FIREBASE_CONFIG, PREVIOUS_ROUTE_COUNT } from '@constants';

export const useFirebase = () => {
  const navigate = useNavigate();
  const { login, logout } = useActions();

  const app = initializeApp(FIREBASE_CONFIG);

  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();

  const onLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { photoURL, email, displayName } = result.user;

      login({ photoURL, email, displayName });
      navigate(PREVIOUS_ROUTE_COUNT);
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
    }
  };

  return {
    app,

    onLogin,
    onLogout,
  };
};

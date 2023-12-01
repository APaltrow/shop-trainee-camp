import { NO_SCROLL_CLASS } from '@constants';
import { useState } from 'react';

interface IAlert {
  text: string;
  onConfirm: () => void;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<IAlert | null>(null);

  const onAlertCall = (alertObj: IAlert) => {
    setAlert(alertObj);
    document.body.classList.add(NO_SCROLL_CLASS);
  };

  const onAlertCancel = () => {
    setAlert(null);
    document.body.classList.remove(NO_SCROLL_CLASS);
  };

  return { alert, onAlertCall, onAlertCancel };
};

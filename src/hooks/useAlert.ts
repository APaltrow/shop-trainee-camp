import { useState } from 'react';

interface IAlert {
  text: string;
  onConfirm: () => void;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<IAlert | null>(null);

  const onAlertCall = (alertObj: IAlert) => {
    setAlert(alertObj);
  };

  const onAlertCancel = () => {
    setAlert(null);
  };

  return { alert, onAlertCall, onAlertCancel };
};

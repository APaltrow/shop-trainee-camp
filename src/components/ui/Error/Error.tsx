import { FC } from 'react';

import { ErrorsMessages, IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Error.module.scss';

interface ErrorProps {
  errorMessage?: string;
}

export const Error: FC<ErrorProps> = ({
  errorMessage = ErrorsMessages.TRY_AGAIN,
}) => {
  return (
    <div className={style.container}>
      <Icon iconName={IconsTypes.ERROR} />
      <h3>Oops, something went wrong ...</h3>
      <p>{errorMessage}</p>
    </div>
  );
};

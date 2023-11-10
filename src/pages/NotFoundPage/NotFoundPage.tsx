import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonSizes, ButtonVariants, LAST_ELEMENT_INDEX } from '@constants';
import { CustomButton } from '@components';

import style from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const onGoBack = () => navigate(LAST_ELEMENT_INDEX);

  return (
    <article className={style.container}>
      <p className={style.notice}>Oops!</p>
      <h1>404 - PAGE NOT FOUND</h1>
      <p>
        The page you are looking for might be removed or temporarily
        unavailable...
      </p>

      <CustomButton
        onClick={onGoBack}
        size={ButtonSizes.MID}
        variant={ButtonVariants.SECONDARY}
      >
        Go back
      </CustomButton>
    </article>
  );
};

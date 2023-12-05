import { FC, useEffect } from 'react';

import { ButtonSizes, ButtonVariants } from '@constants';
import { CustomButton, Portal } from '@components';

import style from './Alert.module.scss';

interface AlertProps {
  text: string;

  onCancel: () => void;
  onConfirm: () => void;
}

export const Alert: FC<AlertProps> = ({
  text,

  onCancel,
  onConfirm,
}) => {
  useEffect(() => {
    const pos = Math.trunc(window.scrollY);
    const disableScroll = () => {
      window.scrollTo({
        top: pos,
      });
    };

    document.addEventListener('scroll', disableScroll, false);
    document.addEventListener('mousewheel', disableScroll, false);
    document.addEventListener('touchmove', disableScroll, false);

    return () => {
      document.removeEventListener('scroll', disableScroll);
      document.removeEventListener('mousewheel', disableScroll);
      document.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  return (
    <Portal>
      <div className={style.overlay}>
        <div className={style.container}>
          <div className={style.content}>
            <p>{text}</p>
            <div className={style.footer}>
              <CustomButton
                onClick={onCancel}
                size={ButtonSizes.MID}
                variant={ButtonVariants.SECONDARY}
              >
                No
              </CustomButton>
              <CustomButton
                onClick={onConfirm}
                size={ButtonSizes.MID}
                variant={ButtonVariants.PRIMARY}
              >
                Yes
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

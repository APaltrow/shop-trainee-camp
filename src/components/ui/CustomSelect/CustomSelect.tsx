import { FC } from 'react';

import { IconsTypes } from '@constants';
import { useClickOutside, useToggle } from '@hooks';
import { CustomButton, Icon } from '@components';

import style from './CustomSelect.module.scss';

interface CustomSelectProps {
  options: string[];
  selected: string;

  onChange: (option: string) => void;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  selected,

  onChange,
}) => {
  const { isOpened, toggle, onClose } = useToggle();

  const dropdownRef = useClickOutside(() => onClose());

  const handleSelectClick = () => toggle();

  const handleSelectOption = (option: string) => {
    onChange(option);
    onClose();
  };

  return (
    <div
      className={style.container}
      ref={dropdownRef}
    >
      <CustomButton onClick={handleSelectClick}>
        <span className={style.option_text}>{selected}</span>
        <span className={style.btn}>
          <Icon iconName={IconsTypes.ARROW_DOWN} />
        </span>
      </CustomButton>

      {isOpened ? (
        <ul className={style.options_list}>
          {options.map((option) => {
            if (option === selected) return null;

            return (
              <li key={`select_${option}`}>
                <CustomButton onClick={() => handleSelectOption(option)}>
                  <span className={style.option_text}>{option}</span>
                </CustomButton>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

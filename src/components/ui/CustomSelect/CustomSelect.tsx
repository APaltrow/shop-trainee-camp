import { FC } from 'react';

import { IconsTypes, SelectVariants } from '@constants';
import { useClickOutside, useToggle } from '@hooks';
import { CustomButton, Icon } from '@components';

import style from './CustomSelect.module.scss';

interface CustomSelectProps {
  options: string[];
  selected: string;
  variant: SelectVariants;

  onChange: (option: string) => void;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  selected,
  variant = SelectVariants.DEFAULT,

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
        <span className={`${style.option_text} ${style[variant]}`}>
          {selected}
        </span>
        <span className={style[`btn_${variant}`]}>
          <Icon iconName={IconsTypes.ARROW_DOWN} />
        </span>
      </CustomButton>

      {isOpened ? (
        <ul className={style.options_list}>
          {options.map((option) => {
            if (option === selected) return null;

            return (
              <li key={`select_${option}`}>
                <button
                  type="button"
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

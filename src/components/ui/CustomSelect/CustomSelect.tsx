import { FC, useState } from 'react';

import { IconsTypes } from '@constants';
import { useClickOutside } from '@hooks';
import { CustomButton, Icon } from '@components';

import style from './CustomSelect.module.scss';

interface CustomSelectProps {
  options: string[];
  defaultValue: string;
  isReadOnly?: boolean;

  onChange: (option: string) => void;
}

const DEFAULT_ALL = 'All';

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  defaultValue,
  isReadOnly = false,

  onChange,
}) => {
  const initialValue = defaultValue || DEFAULT_ALL;

  const [isOpened, setOpened] = useState(false);
  const [selected, setSelected] = useState(initialValue);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange(option);
    setOpened(false);
  };

  const handleClick = () => setOpened((prev) => !prev);

  const dropdownRef = useClickOutside(() => setOpened(false));

  return (
    <div
      className={style.container}
      ref={dropdownRef}
    >
      <CustomButton onClick={handleClick}>
        <span className={style.option_text}>
          {isReadOnly ? defaultValue : selected}
        </span>
        <span className={style.btn}>
          <Icon iconName={IconsTypes.ARROW_DOWN} />
        </span>
      </CustomButton>

      {isOpened ? (
        <ul className={style.options_list}>
          {selected !== initialValue ? (
            <li>
              <CustomButton onClick={() => handleSelect(initialValue)}>
                <span className={style.option_text}>{initialValue}</span>
              </CustomButton>
            </li>
          ) : null}

          {options.map((option) => (
            <li key={`select_${option}`}>
              <CustomButton onClick={() => handleSelect(option)}>
                <span className={style.option_text}>{option}</span>
              </CustomButton>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

import { FC } from 'react';

import { IconsTypes, SelectVariants } from '@constants';
import { useToggle } from '@hooks';
import { CustomButton, Dropdown, DropdownItem, Icon } from '@components';

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

  const handleSelectOption = (option: string) => {
    onChange(option);
    onClose();
  };

  const selectAnchor = (
    <CustomButton onClick={toggle}>
      <span className={`${style.option_text} ${style[variant]}`}>
        {selected}
      </span>
      <span className={style[`btn_${variant}`]}>
        <Icon iconName={IconsTypes.ARROW_DOWN} />
      </span>
    </CustomButton>
  );

  return (
    <Dropdown
      anchor={selectAnchor}
      onClose={onClose}
    >
      {isOpened
        ? options.map((option) => {
            if (option === selected) return null;

            return (
              <DropdownItem
                key={`select_${option}`}
                option={option}
                onSelect={() => handleSelectOption(option)}
              />
            );
          })
        : null}
    </Dropdown>
  );
};

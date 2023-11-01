import { ChangeEvent, FC } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Search.module.scss';

interface SearchProps {
  value: string;
  placeholder: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

export const Search: FC<SearchProps> = ({
  value,
  placeholder,
  onChange,
  onFocus,
}) => {
  return (
    <div className={style.container}>
      <input
        type="search"
        value={value}
        autoComplete="off"
        onChange={onChange}
        onFocus={onFocus}
        className={style.input}
        placeholder={placeholder}
      />

      <span className={style.icon}>
        <Icon iconName={IconsTypes.SEARCH} />
      </span>
    </div>
  );
};

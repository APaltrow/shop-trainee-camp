import { ChangeEvent, FC } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Search.module.scss';

interface SearchProps {
  value?: string;
  placeholder: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<SearchProps> = ({ value, placeholder, onChange }) => {
  return (
    <div className={style.container}>
      <input
        type="search"
        value={value}
        autoComplete="off"
        onChange={onChange}
        className={style.input}
        placeholder={placeholder}
      />

      <span className={style.icon}>
        <Icon iconName={IconsTypes.SEARCH} />
      </span>
    </div>
  );
};

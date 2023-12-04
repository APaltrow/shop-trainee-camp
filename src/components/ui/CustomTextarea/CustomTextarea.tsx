import { ChangeEvent, FC, useId } from 'react';

import style from './CustomTextarea.module.scss';

interface CustomTextareaProps {
  value: string;
  label: string;
  name: string;
  placeholder: string;
  error: string;

  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CustomTextarea: FC<CustomTextareaProps> = ({
  value,
  label,
  name,
  placeholder,
  error,

  onChange,
}) => {
  const textAreaID = useId();

  return (
    <div className={style.text_area_container}>
      <label
        htmlFor={textAreaID}
        className={style.text_area_label}
      >
        {label}
      </label>
      <textarea
        className={style.text_area}
        value={value}
        name={name}
        id={textAreaID}
        placeholder={placeholder}
        onChange={onChange}
      />

      {!!error && <span className={style.error}>{error}</span>}
    </div>
  );
};

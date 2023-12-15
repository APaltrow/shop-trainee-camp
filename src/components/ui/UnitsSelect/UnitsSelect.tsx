import { ChangeEvent, FC } from 'react';

import {
  SelectVariants,
  UNIT_MIN_VALUE,
  UNIT_PLACEHOLDER,
  UNIT_STEP,
} from '@constants';
import { handleKeyDown } from '@helpers';
import { BinarySection, CustomSelect } from '@components';

import style from './UnitsSelect.module.scss';

interface UnitsSelectProps {
  unitsMax: number;
  unitsAmount: number;
  options: string[];
  selected: string;
  error: string;
  unitsInfo?: string;
  isDisabled?: boolean;
  isUnitsInfoVisible?: boolean;
  unitsInProp?: string;

  onUnitsAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (option: string) => void;
  onBlur?: () => void;
}

export const UnitsSelect: FC<UnitsSelectProps> = ({
  unitsMax,
  error,
  unitsInProp,
  unitsAmount,
  unitsInfo,
  options,
  selected,
  isDisabled = false,
  isUnitsInfoVisible = false,
  onUnitsAmountChange,
  onSelect,
  onBlur,
}) => {
  const inputValue = unitsAmount ? unitsAmount.toString() : '';

  return (
    <div className={style.container}>
      <BinarySection
        leftElement={
          <input
            className={style.input}
            type="number"
            placeholder={UNIT_PLACEHOLDER}
            onKeyDown={handleKeyDown}
            onChange={onUnitsAmountChange}
            onBlur={onBlur}
            step={UNIT_STEP}
            min={UNIT_MIN_VALUE}
            readOnly={isDisabled}
            max={unitsMax}
            value={inputValue}
          />
        }
        rightElement={
          <CustomSelect
            options={options}
            selected={selected}
            variant={SelectVariants.DEFAULT}
            onChange={onSelect}
          />
        }
      />
      {!!unitsInProp && <p className={style.info_top}>{unitsInProp}</p>}
      {isUnitsInfoVisible && <p className={style.info_bot}>{unitsInfo}</p>}
      {!!error && <span className={style.error}>{error}</span>}
    </div>
  );
};

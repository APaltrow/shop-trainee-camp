import { FC } from 'react';

import {
  UNIT_STEP,
  UNIT_MIN_VALUE,
  UNIT_PLACEHOLDER,
  IconsTypes,
  ButtonSizes,
  SelectVariants,
  ButtonVariants,
} from '@constants';
import { handleKeyDown } from '@helpers';
import { useProductToolbar } from '@hooks';
import { BinarySection, CustomButton, CustomSelect, Icon } from '@components';

import style from './ProductToolbar.module.scss';

export const ProductToolbar: FC = () => {
  const toolbar = useProductToolbar();

  if (!toolbar) return null;

  const {
    unitsMax,
    unitsInfo,
    unitsError,
    unitsAmount,
    buyByOptions,
    unitsInProp,

    totalDue,
    totalBeforeDiscount,

    buyByActiveOption,
    isUnitsInfoVisible,

    onUnitsAmountChange,
    onActiveBuyByChange,
  } = toolbar;

  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <div className={style.prices}>
          <p className={style.due_amount}>{totalDue}</p>

          {totalBeforeDiscount && (
            <p className={style.discount}>{totalBeforeDiscount}</p>
          )}
        </div>

        <div className={style.unit_select}>
          <BinarySection
            leftElement={
              <input
                className={style.units_input}
                type="number"
                placeholder={UNIT_PLACEHOLDER}
                onKeyDown={handleKeyDown}
                onChange={onUnitsAmountChange}
                step={UNIT_STEP}
                min={UNIT_MIN_VALUE}
                max={unitsMax}
                value={unitsAmount || ''}
              />
            }
            rightElement={
              <CustomSelect
                options={buyByOptions}
                selected={buyByActiveOption}
                variant={SelectVariants.DEFAULT}
                onChange={onActiveBuyByChange}
              />
            }
          />
          {unitsInProp && <p className={style.units_info}>{unitsInProp}</p>}
          {isUnitsInfoVisible && <p className={style.total_pcs}>{unitsInfo}</p>}
          {!!unitsError && <span className={style.error}>{unitsError}</span>}
        </div>

        <CustomButton
          onClick={() => {}}
          variant={ButtonVariants.PRIMARY}
          size={ButtonSizes.MID}
        >
          <span className={style.add_icon}>
            <Icon iconName={IconsTypes.PLUS} />
          </span>
          Add to cart
        </CustomButton>
      </div>

      <CustomButton onClick={() => {}}>
        <Icon iconName={IconsTypes.HEART} />
        Add to my wishlist
      </CustomButton>
    </div>
  );
};

import { FC } from 'react';

import {
  IconsTypes,
  ButtonSizes,
  SelectVariants,
  ButtonVariants,
} from '@constants';
import { useProductToolbar } from '@hooks';
import { BinarySection, CustomButton, CustomSelect, Icon } from '@components';

import style from './ProductToolbar.module.scss';

export const ProductToolbar: FC = () => {
  const toolbar = useProductToolbar();

  if (!toolbar) return null;

  const {
    price,
    unitsInfo,
    unitsAmount,
    buyByOptions,
    totalDueAmount,
    buyByActiveOption,
    isUnitsInfoVisible,

    onUnitsAmountChange,
    onActiveBuyByChange,
  } = toolbar;

  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <div className={style.prices}>
          <p className={style.due_amount}>
            {`${totalDueAmount} ${price.currency}`}
          </p>
          {!!price.discount && (
            <p className={style.discount}>
              {`${price.discountedAmount} ${price.currency}`}
            </p>
          )}
        </div>

        <div className={style.unit_select}>
          <BinarySection
            leftElement={
              <input
                type="number"
                value={unitsAmount || ''}
                onChange={onUnitsAmountChange}
                min={1}
                max={50}
                step={1}
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

          {isUnitsInfoVisible && <p className={style.hint}>{unitsInfo}</p>}
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

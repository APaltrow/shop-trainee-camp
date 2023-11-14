import { FC } from 'react';

import {
  IconSizes,
  IconsTypes,
  SORT_OPTIONS,
  SelectVariants,
  SortOrder,
  SortProperty,
} from '@constants';
import { useProductsSort } from '@hooks';
import { BinarySection, CustomButton, CustomSelect, Icon } from '@components';

import style from './ProductsToolbar.module.scss';

interface ProductsToolbarProps {
  toggle: () => void;
}

export const ProductsToolbar: FC<ProductsToolbarProps> = ({ toggle }) => {
  const {
    sort,

    handleSelectSort,
    handleSortOrderChange,
  } = useProductsSort();

  return (
    <div className={style.container}>
      <div className={style.sort}>
        <BinarySection
          leftElement={<span className={style.sort_by}>Sort by</span>}
          rightElement={
            <CustomSelect
              options={SORT_OPTIONS}
              selected={sort?.property || SortProperty.NO_SORT}
              variant={SelectVariants.DEFAULT}
              onChange={handleSelectSort}
            />
          }
        />

        {!!sort && (
          <CustomButton onClick={handleSortOrderChange}>
            <span className={style.order_btn}>
              <Icon
                iconName={
                  sort.order === SortOrder.ASCENDING
                    ? IconsTypes.ORDER_ASC
                    : IconsTypes.ORDER_DESC
                }
                size={IconSizes.LARGE}
              />
            </span>
          </CustomButton>
        )}
      </div>

      <span className={style.filter_btn}>
        <CustomButton onClick={toggle}>
          <Icon
            iconName={IconsTypes.FILTER}
            size={IconSizes.LARGE}
          />
          <span className={style.filter_btn_text}>Filters</span>
        </CustomButton>
      </span>
    </div>
  );
};

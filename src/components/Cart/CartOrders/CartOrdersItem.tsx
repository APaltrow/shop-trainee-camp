import { FC } from 'react';

import { IconsTypes, SelectVariants } from '@constants';
import {
  BinarySection,
  CustomButton,
  CustomImage,
  CustomSelect,
  Icon,
  Rating,
} from '@components';

import style from './CartOrders.module.scss';

const IMG_SRC =
  'https://images.pexels.com/photos/15469650/pexels-photo-15469650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const IMG_ALT = 'asdasd';

export const CartOrdersItem: FC = () => {
  return (
    <article className={style.container}>
      <div className={style.left}>
        <div className={style.img}>
          <CustomImage
            fullSize
            src={IMG_SRC}
            alt={IMG_ALT}
          />
        </div>

        <CustomButton>
          <span className={style.icon_heart}>
            <Icon iconName={IconsTypes.HEART} />
          </span>

          <span className={style.btn}>Wishlist</span>
        </CustomButton>

        <CustomButton>
          <Icon iconName={IconsTypes.CLOSE} />
          <span className={style.btn}>Remove</span>
        </CustomButton>
      </div>

      <div className={style.right}>
        <div className={style.description}>
          <h3 className={style.title}>Product Title</h3>
          <ul className={style.description_list}>
            <li className={style.description_item}>
              <span className={style.description_title}>Farm: </span>
              <span className={style.description_text}>Tharamis Farm</span>
            </li>
            <li className={style.description_item}>
              <span className={style.description_title}>Freshness: </span>
              <span className={style.description_text}>1 day old</span>
            </li>
          </ul>
          <Rating
            rating={4}
            isActive
          />
        </div>

        <div className={style.price_section}>
          <p className={style.price}>36.99 USD</p>
          <div>
            <BinarySection
              leftElement={
                <input
                  value={1}
                  className={style.input}
                />
              }
              rightElement={
                <CustomSelect
                  options={['pcs', 'box', 'pack']}
                  selected="pcs"
                  variant={SelectVariants.DEFAULT}
                  onChange={() => {}}
                />
              }
            />
          </div>
        </div>
      </div>
    </article>
  );
};

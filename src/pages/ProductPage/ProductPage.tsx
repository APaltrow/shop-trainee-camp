import { FC } from 'react';

import {
  ButtonSizes,
  ButtonVariants,
  IconsTypes,
  SelectVariants,
} from '@constants';
import {
  BinarySection,
  CustomButton,
  CustomSelect,
  Icon,
  InfoTooltip,
  Image,
  Rating,
} from '@components';

import style from './ProductPage.module.scss';

export const ProductPage: FC = () => {
  const infoOne = {
    country: 'USA',
    category: 'Vagetables',
    stock: 'In Stock',
    color: 'Red',
  };

  const infoTwo = {
    size: 'all sizes',
    'buy by': 'pcs, kgs, box, pack',
    delivery: 'in 2 days',
    'delivery area': 'Czech republic',
  };

  const firstInfoList = Object.entries(infoOne);
  const secondInfoList = Object.entries(infoTwo);

  const imgscr =
    'https://images.adsttc.com/media/images/56dc/6512/e58e/cec3/ec00/0063/medium_jpg/House_of_Vans_London_Entrance_(1).jpg?1457284363';

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {/* LEFT SECTION */}
        <div className={style.left_section}>
          <div className={style.info_tags}>
            <InfoTooltip
              info="-36%"
              isBig
            />
            <InfoTooltip
              info="Free shipping"
              isBig
            />
          </div>

          <div className={style.picture_gallery}>
            <div className={style.picture}>
              <Image
                src={imgscr}
                alt="asdasd"
                fullSize
              />
            </div>
            <div className={style.gallery_secondary}>
              <div className={style.picture_secondary}>
                <Image
                  src={imgscr}
                  alt="asdasd"
                  fullSize
                />
              </div>
              <div className={style.picture_secondary}>
                <Image
                  src={imgscr}
                  alt="asdasd"
                  fullSize
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className={style.right_section}>
          {/* INFO CONTAINER */}
          <article className={style.info_wrapper}>
            <div className={style.info_header}>
              <h1 className={style.title}>Carrots from Tomissy Farm</h1>
              <div className={style.reviews}>
                <Rating rating={4} />
                <span className={style.reviews_count}>
                  {`(1 Customer review)`}
                </span>
              </div>
            </div>

            <p className={style.description}>
              Carrots from Tomissy Farm are one of the best on the market.
              Tomisso and his family are giving a full love to his Bio products.
              To misso’s carrots are growing on the fields naturally.
            </p>

            <div className={style.additional_info}>
              <ul className={style.list}>
                {firstInfoList.map(([title, text]) => (
                  <li className={style.item}>
                    <span className={style.info_title}>{title}:</span>
                    <span className={style.info_text}>{text}</span>
                  </li>
                ))}
              </ul>

              <ul className={style.list}>
                {secondInfoList.map(([title, text]) => (
                  <li className={style.item}>
                    <span className={style.info_title}>{title}:</span>
                    <span className={style.info_text}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={style.toolbar_container}>
              <div className={style.toolbar}>
                <div className={style.prices}>
                  <p className={style.price}>36.26 USD</p>
                  <p className={style.discount}>48.56 USD</p>
                </div>

                <div>
                  <BinarySection
                    leftElement={<span>1</span>}
                    rightElement={
                      <CustomSelect
                        options={['pcs', 'box', 'kgs', 'pack']}
                        selected="Pcs"
                        variant={SelectVariants.DEFAULT}
                        onChange={() => {}}
                      />
                    }
                  />
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
          </article>

          {/* DESCRIPTIONS  REVIEWS QUESTIONS */}
          <div>TABS</div>
        </div>
      </div>

      {/* SUGGESTED PRODUCTS */}
      <div>maybe love products</div>
    </div>
  );
};

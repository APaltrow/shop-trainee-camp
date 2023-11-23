import { FC } from 'react';

import { IReview, IQuestion } from '@types';
import { CustomImage } from '@components';

import style from './ProductComments.module.scss';

interface CommentsProps {
  list: IReview[] | IQuestion[];
}

export const ProductComments: FC<CommentsProps> = ({ list = [] }) => {
  return (
    <ul className={style.list}>
      {list.map(({ id, imgUrl, text, userName, timestamp }) => (
        <li
          className={style.item}
          key={id}
        >
          <article className={style.comment}>
            <div className={style.profile_img}>
              <CustomImage
                src={imgUrl}
                alt={userName}
                fullSize
              />
            </div>

            <div className={style.content}>
              <div className={style.header}>
                <h5 className={style.username}>{userName}</h5>
                <span className={style.timestamp}>{timestamp}</span>
              </div>
              <p className={style.text}>{text}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

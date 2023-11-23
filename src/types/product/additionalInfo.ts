import { IFullDescription } from './descriptionTypes';
import { IQuestion } from './questionsTypes';
import { IReview } from './reviewsTypes';

export interface IAdditionalInfo {
  reviews: IReview[];
  questions: IQuestion[];
  description: IFullDescription;
}

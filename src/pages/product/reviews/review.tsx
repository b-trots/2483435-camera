import { BemClass, ExplanationWord } from '@/const/const';
import { ReviewType } from '@/types/types';
import { ProductRate } from '../product-rate';
import { List } from '@/components/main/list';
import { reviewDate } from '@/utils/utils';

type ReviewProps = {
  comment: ReviewType;
};
export function Review({ comment }: ReviewProps) {
  const { createAt, userName, advantage, disadvantage, review, rating } =
    comment;
  const correctDate = reviewDate(createAt);

  const reviewDetails = [
    { title: ExplanationWord.Advantage, value: advantage },
    { title: ExplanationWord.Disadvantage, value: disadvantage },
    { title: ExplanationWord.Comment, value: review },
  ];
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>
          {correctDate}
        </time>
      </div>
      <ProductRate bemClass={BemClass.ReviewCard} rating={rating} />
      <List bemClass={BemClass.ReviewCard} listDetails={reviewDetails} />
    </li>
  );
}

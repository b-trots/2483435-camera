import { useState } from 'react';
import { ActiveButton } from '../../../components/main/buttons/active-button';
import { ExplanationWord, ServiceParam } from '../../../const/const';
import { ActiveButtonName } from '../../../const/const-button';
import { mockReviews } from '../../../mock/mock';
import { daySort } from '../../../utils/utils';
import { Review } from './review';

type ReviewsProps = {
  productId: string;
};
export function Reviews({ productId }: ReviewsProps) {
  const productReviews = mockReviews
    .filter((review) => review.cameraId === +productId)
    .sort(daySort);
  const reviewsCount = productReviews.length;

  const [shownComments, setShownComments] = useState(
    ServiceParam.ShownComments
  );
  const isMoreReviewButton = shownComments < reviewsCount;
  const handleMoreReviews = () =>
    setShownComments((prevState) =>
      Math.min(prevState + ServiceParam.ShownCommentsStep, reviewsCount)
    );

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">{ExplanationWord.Reviews}</h2>
          {/*<button class="btn" type="button">Оставить свой отзыв</button>*/}
        </div>
        <ul className="review-block__list">
          {productReviews.slice(0, shownComments).map((comment) => (
            <Review comment={comment} key={comment.id} />
          ))}
        </ul>
        <div className="review-block__buttons">
          {isMoreReviewButton && (
            <ActiveButton
              onClick={handleMoreReviews}
              text={ActiveButtonName.MoreReviews}
            />
          )}
        </div>
      </div>
    </section>
  );
}

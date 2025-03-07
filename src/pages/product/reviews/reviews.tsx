import { useEffect, useState } from 'react';
import { ActiveButton } from '../../../components/main/buttons/active-button';
import {
  ExplanationWord,
  RequestStatus,
  ServiceParam,
} from '../../../const/const';
import { ActiveButtonName } from '../../../const/const-button';
import { Review } from './review';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getCurrentReviews,
  getReviewsRequestStatus,
} from '../../../store/slices/reviews/reviews-selectors';
import { fetchOrSetReviewsAction } from '../../../store/api-actions/api-actions';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../components/main/loading';

export function Reviews() {
  const dispatch = useAppDispatch();
  const currentReviews = useAppSelector(getCurrentReviews);
  const reviewsLoadStatus = useAppSelector(getReviewsRequestStatus);
  const isReviewsLoading = reviewsLoadStatus === RequestStatus.Loading;

  const { id = '' } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrSetReviewsAction(Number(id)));
    }
  }, [id, dispatch]);

  const reviewsCount = currentReviews.length;

  const [shownComments, setShownComments] = useState(
    ServiceParam.ShownComments
  );
  const isMoreReviewButton = shownComments < reviewsCount;
  const handleMoreReviews = () =>
    setShownComments((prevState) =>
      Math.min(prevState + ServiceParam.ShownCommentsStep, reviewsCount)
    );

  return isReviewsLoading ? (
    <Loading />
  ) : (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">{ExplanationWord.Reviews}</h2>
          {/*<button class="btn" type="button">Оставить свой отзыв</button>*/}
        </div>
        <ul className="review-block__list">
          {currentReviews.slice(0, shownComments).map((comment) => (
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

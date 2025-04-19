import { useEffect, useRef, useState } from 'react';
import { ActiveButton } from '../../../components/main/buttons/active-button';
import {
  DefaultParam,
  ExplanationWord,
  RequestCategory,
  RequestStatus,
  ServiceParam,
} from '../../../const/const';
import { ActiveButtonName } from '../../../const/const-button';
import { Review } from './review';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getCurrentReviews,
  getReviewsError,
  getReviewsRequestStatus,
} from '../../../store/slices/reviews/reviews-selectors';
import { useParams } from 'react-router-dom';
import { LoadData } from '../../../components/load-data/load-data';
import { fetchOrSetReviewsAction } from '../../../store/slices/reviews/reviews-actions';

export function Reviews() {
  const dispatch = useAppDispatch();
  const currentReviews = useAppSelector(getCurrentReviews);
  const reviewsLoadStatus = useAppSelector(getReviewsRequestStatus);
  const isReviewsLoading = reviewsLoadStatus === RequestStatus.Loading;
  const reviewsError = useAppSelector(getReviewsError);
  const { id = DefaultParam.EmptyString } = useParams();
  const [shownComments, setShownComments] = useState<number>(
    ServiceParam.ShownComments
  );
  const reviewsCount = currentReviews.length;
  const isMoreComments = shownComments < reviewsCount;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleMoreReviews = () =>
    setShownComments((prev) => prev + Number(ServiceParam.ShownCommentsStep));

  useEffect(() => {
    if (id) {
      dispatch(fetchOrSetReviewsAction(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[DefaultParam.ZeroIndex].isIntersecting && isMoreComments) {
          handleMoreReviews();
        }
      },
      { rootMargin: ServiceParam.ReviewsScrollThreshold as string }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [isMoreComments]);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">{ExplanationWord.Reviews}</h2>
          </div>
          <ul className="review-block__list">
            {reviewsError || isReviewsLoading ? (
              <LoadData
                requestCategory={RequestCategory.Reviews}
                loading={isReviewsLoading}
                error={reviewsError}
              />
            ) : (
              currentReviews
                .slice(ServiceParam.ZeroValue, shownComments)
                .map((comment) => <Review comment={comment} key={comment.id} />)
            )}
          </ul>
          <div className="review-block__buttons" ref={observerRef}>
            {isMoreComments && (
              <ActiveButton
                onClick={handleMoreReviews}
                text={ActiveButtonName.MoreReviews}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

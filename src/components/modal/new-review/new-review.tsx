import {
  BemClass,
  BemMode,
  DefaultParam,
  ModalTitle,
  REVIEW_PARAM,
} from '@/const/const';
import { RatingCount } from './rating-count';
import { ReviewInputItem } from './review-input-item.';
import { ActiveButton } from '@/components/main/buttons/active-button';
import {
  ActiveButtonName,
  ButtonBemClass,
  ButtonType,
} from '@/const/const-button';
import { forwardRef, useState } from 'react';
import {
  NewReviewErrorType,
  NewReviewKeys,
  NewReviewType,
} from '@/types/types';
import { reviewValidation } from '@/utils/review-validation';
import { useAppDispatch } from '@/hooks/hooks';
import { fetchNewReviewAction } from '@/store/slices/reviews/reviews-actions';
import { useSelector } from 'react-redux';
import { getCurrentCameraId } from '@/store/slices/cameras/cameras-selectors';

const initialReview = {
  rate: DefaultParam.ZeroValue,
  name: DefaultParam.EmptyString,
  plus: DefaultParam.EmptyString,
  minus: DefaultParam.EmptyString,
  comment: DefaultParam.EmptyString,
};

const initialReviewError = {
  rate: true,
  name: true,
  plus: true,
  minus: true,
  comment: true,
};

export function NewReviewComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLInputElement>
) {
  const cameraId = useSelector(getCurrentCameraId);
  const dispatch = useAppDispatch();
  const [review, setReview] = useState<NewReviewType>(initialReview);
  const [reviewErrors, setReviewErrors] =
    useState<NewReviewErrorType>(initialReviewError);
  const handleFormInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;
    const paramName = (
      target.name === BemClass.Rate
        ? target.name
        : target.name.replace(BemClass.User, BemMode.Void).trim()
    ) as NewReviewKeys;
    setReview({
      ...review,
      [paramName]:
      paramName === BemClass.Rate ? Number(newValue) : newValue,
    });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const validation = reviewValidation(review, reviewErrors, setReviewErrors);
    if (validation && cameraId !== null) {
      dispatch(
        fetchNewReviewAction({
          cameraId: cameraId,
          userName: review.name,
          advantage: review.plus,
          disadvantage: review.minus,
          review: review.comment,
          rating: review.rate,
        })
      );
    }
  };

  return (
    <>
      <p className="title title--h4">{ModalTitle.NewReview}</p>
      <div className="form-review">
        <form method="post">
          <div className="form-review__rate">
            <RatingCount
              value={review.rate}
              errorStatus={reviewErrors.rate}
              onChange={handleFormInputsChange}
              ref={firstTabRef}
            />
            {REVIEW_PARAM.map((reviewParamItem) => (
              <ReviewInputItem
                reviewParamItem={reviewParamItem}
                key={reviewParamItem.id}
                value={review[reviewParamItem.id as NewReviewKeys]}
                errorStatus={reviewErrors[reviewParamItem.id as NewReviewKeys]}
                onChange={handleFormInputsChange}
              />
            ))}
          </div>
          <ActiveButton
            className={ButtonBemClass.Review}
            type={ButtonType.Submit}
            text={ActiveButtonName.Review}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
}

export const NewReview = forwardRef(NewReviewComponent);

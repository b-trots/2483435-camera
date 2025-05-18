import {
  DefaultParam,
  NameSpace,
  RATING_STAR_COUNT,
  ServiceParam,
} from '@/const/const';
import {
  NewReviewErrorType,
  NewReviewKeys,
  NewReviewStringFieldsKeys,
  NewReviewType,
} from '@/types/types';

const reviewValidation = (
  review: NewReviewType,
  reviewErrors: NewReviewErrorType,
  setReviewErrors: (errors: NewReviewErrorType) => void
) => {
  const newReviewErrors = { ...reviewErrors };
  const changeErrorStatus = (field: NewReviewKeys, isValid: boolean) => {
    newReviewErrors[field] = isValid;
  };

  (Object.keys(review) as NewReviewKeys[]).forEach((field) => {
    switch (field) {
      case NameSpace.RateField:
        changeErrorStatus(
          field,
          DefaultParam.ZeroValue < review.rate &&
            review.rate <= RATING_STAR_COUNT
        );
        break;
      case NameSpace.UserNameField:
        changeErrorStatus(
          field,
          ServiceParam.ReviewNameMinSymbols <= review.name.length &&
            review.name.length <= ServiceParam.ReviewNameMaxSymbols
        );
        break;
      default: {
        const currentField = review[field as NewReviewStringFieldsKeys];
        changeErrorStatus(
          field,
          ServiceParam.ReviewFieldMinSymbols <= currentField.length &&
            currentField.length <= ServiceParam.ReviewFieldMaxSymbols
        );
      }
    }
  });
  setReviewErrors(newReviewErrors);
  return Object.values(newReviewErrors).every(Boolean);
};

export { reviewValidation };

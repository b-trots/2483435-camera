import { createSelector } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';
import { daySort } from '../../../utils/utils';

const getReviews = createSelector(
  [(state: State) => state[SliceName.Reviews].allReviews],
  (reviews) => reviews
);

const getCurrentReviews = createSelector(
  [(state: State) => state[SliceName.Reviews].currentReviews],
  (currentReviews) => currentReviews
);

const getReviewsByProductId = (productId: number) =>
  createSelector(
    [(state: State) => state[SliceName.Reviews].allReviews],
    (allReviews) => {
      const productReviews = allReviews[productId];
      return productReviews ? [...productReviews].sort(daySort) : [];
    }
  );

const getReviewsRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Products].requestStatus;

export {
  getReviews,
  getCurrentReviews,
  getReviewsByProductId,
  getReviewsRequestStatus,
};

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
  (currentReviews) => (currentReviews ? [...currentReviews].sort(daySort) : [])
);

const getReviewsRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Products].requestStatus;

const getReviewsError = (state: State) => state[SliceName.Reviews].reviewsError;

export {
  getReviews,
  getCurrentReviews,
  getReviewsRequestStatus,
  getReviewsError,
};

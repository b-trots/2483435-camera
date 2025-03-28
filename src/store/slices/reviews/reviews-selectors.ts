import { createSelector } from '@reduxjs/toolkit';
import { DefaultParam, RequestStatus, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';
import { daySort } from '../../../utils/utils';
import { getCurrentCameraId } from '../cameras/cameras-selectors';

export type ReviewsState = Pick<State, SliceName.Reviews>;

const getAllCamerasReviews = (state: ReviewsState) =>
  state[SliceName.Reviews].allCamerasReviews;

const getCurrentReviews = createSelector(
  [getAllCamerasReviews, getCurrentCameraId],
  (allCamerasReviews, currentCameraId) => {
    const reviews =
      currentCameraId && allCamerasReviews[currentCameraId]
        ? allCamerasReviews[currentCameraId]
        : DefaultParam.EmptyArray;
    if (Array.isArray(reviews) && reviews.length !== 0) {
      return [...reviews].sort(daySort);
    }

    return DefaultParam.EmptyArray;
  }
);

const getReviewsRequestStatus = (state: ReviewsState): RequestStatus =>
  state[SliceName.Reviews].requestStatus;

const getReviewsError = (state: ReviewsState) =>
  state[SliceName.Reviews].reviewsError;

export {
  getAllCamerasReviews,
  getCurrentReviews,
  getReviewsRequestStatus,
  getReviewsError,
};

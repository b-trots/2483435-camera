import { createSelector } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '@/const/const';
import { State } from '@/types/store-types/store-types';
import { getCurrentCameraId } from '../cameras/cameras-selectors';
import { daySort } from '@/utils/filter-and-sorting-utils/sorting-utils';

export type ReviewsState = Pick<State, SliceName.Reviews>;

const getAllCamerasReviews = (state: ReviewsState) =>
  state[SliceName.Reviews].allCamerasReviews;

const getCurrentReviews = createSelector(
  [getAllCamerasReviews, getCurrentCameraId],
  (allCamerasReviews, currentCameraId) => {
    if (!currentCameraId || !allCamerasReviews[currentCameraId]) {
      return [];
    }
    const reviews = allCamerasReviews[currentCameraId];

    if (Array.isArray(reviews) && reviews.length !== 0) {
      return [...reviews].sort(daySort);
    }

    return [];
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

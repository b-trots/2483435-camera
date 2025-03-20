import { createSelector } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';
import { daySort } from '../../../utils/utils';
import { getCurrentCameraId } from '../cameras/cameras-selectors';

const getAllCamerasReviews = (state: State) =>
  state[SliceName.Reviews].allCamerasReviews;

const getCurrentReviews = createSelector(
  [getAllCamerasReviews, getCurrentCameraId],
  (allCamerasReviews, currentCameraId) => {
    const reviews =
      currentCameraId && allCamerasReviews[currentCameraId]
        ? allCamerasReviews[currentCameraId]
        : [];

    if (reviews.length !== 0) {
      return [...reviews].sort(daySort);
    }

    return [];
  }
);

const getReviewsRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Reviews].requestStatus;

const getReviewsError = (state: State) => state[SliceName.Reviews].reviewsError;

export {
  getAllCamerasReviews,
  getCurrentReviews,
  getReviewsRequestStatus,
  getReviewsError,
};

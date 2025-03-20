import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '../../../const/const';
import { ReviewsSlice } from '../../../types/store-types/slices-types';
import { ReviewsType } from '../../../types/types';
import { fetchOrSetReviewsAction } from './reviews-actions';

const reviewsState: ReviewsSlice = {
  allCamerasReviews: {},
  requestStatus: RequestStatus.Idle,
  reviewsError: false,
};

const reviewsSlice = createSlice({
  name: SliceName.Reviews,
  initialState: reviewsState,
  reducers: {
    addReviewToAllCamerasReviews: (
      state,
      action: PayloadAction<{ cameraId: number; reviews: ReviewsType }>
    ) => {
      const { cameraId, reviews } = action.payload;
      state.allCamerasReviews[cameraId] = reviews;
      state.allCamerasReviews[cameraId] = reviews;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrSetReviewsAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.reviewsError = false;
      })
      .addCase(fetchOrSetReviewsAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOrSetReviewsAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.reviewsError = true;
      });
  },
});

const { addReviewToAllCamerasReviews } = reviewsSlice.actions;

export { reviewsSlice, addReviewToAllCamerasReviews };

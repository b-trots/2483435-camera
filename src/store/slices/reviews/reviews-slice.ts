import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus, SliceName } from '../../../const/const';
import { ReviewsSlice } from '../../../types/store-types/slices-types';
import { fetchOrSetReviewsAction } from '../../api-actions/api-actions';
import { ReviewsType } from '../../../types/types';

const ReviewsState: ReviewsSlice = {
  allReviews: {},
  currentReviews: [],
  requestStatus: RequestStatus.Idle,
};

const reviewsSlice = createSlice({
  name: SliceName.Product,
  initialState: ReviewsState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewsType>) => {
      state.currentReviews = action.payload;
      state.requestStatus = RequestStatus.Success;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrSetReviewsAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOrSetReviewsAction.fulfilled, (state, action) => {
        const reviews = action.payload;
        if (reviews) {
          const productId = reviews[NameSpace.FirstElement].cameraId;
          state.allReviews[productId] = reviews;
          state.currentReviews = reviews;
        }
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOrSetReviewsAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
});

const { setReviews } = reviewsSlice.actions;

export { reviewsSlice, setReviews };

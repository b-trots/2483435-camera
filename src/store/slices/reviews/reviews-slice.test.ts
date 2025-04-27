import { RequestStatus } from '@/const/const';
import { generateReviewsForCameras } from '@/utils/mock/mock';
import { fetchOrSetReviewsAction } from './reviews-actions';
import { addReviewToAllCamerasReviews, reviewsSlice } from './reviews-slice';

describe('Reviews Slice', () => {
  const initialState = {
    allCamerasReviews: {},
    requestStatus: RequestStatus.Idle,
    reviewsError: false,
  };

  const reviews = generateReviewsForCameras(1, 3)[0];
  const cameraId = 1;

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const result = reviewsSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with an empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = reviewsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('addReviewToAllCamerasReviews should add reviews for a camera', () => {
    const action = addReviewToAllCamerasReviews({ cameraId, reviews });
    const result = reviewsSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      allCamerasReviews: {
        [cameraId]: reviews,
      },
    };

    expect(result).toEqual(expectedState);
  });

  it('should handle pending state of fetchOrSetReviewsAction', () => {
    const action = { type: fetchOrSetReviewsAction.pending.type };
    const result = reviewsSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Loading,
      reviewsError: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('should handle fulfilled state of fetchOrSetReviewsAction', () => {
    const action = {
      type: fetchOrSetReviewsAction.fulfilled.type,
      payload: { cameraId: 1, reviews: [] },
    };

    const result = reviewsSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Success,
      allCamerasReviews: initialState.allCamerasReviews,
      reviewsError: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('should handle rejected state of fetchOrSetReviewsAction', () => {
    const action = { type: fetchOrSetReviewsAction.rejected.type };
    const result = reviewsSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Failed,
      reviewsError: true,
    };

    expect(result).toEqual(expectedState);
  });
});

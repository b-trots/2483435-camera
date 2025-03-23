import { RequestStatus, SliceName } from '../../../const/const';
import { CamerasForState, PromoCamera } from '../../../types/product-type';
import { ReviewsForState } from '../../../types/types';
import {
  generateReviewsForCameras,
  generateReviewsForState,
} from '../../../utils/mock';
import { daySort } from '../../../utils/utils';
import {
  getAllCamerasReviews,
  getCurrentReviews,
  getReviewsError,
  getReviewsRequestStatus,
} from './reviews-selectors';

interface State {
  [SliceName.Cameras]: {
    allCameras: CamerasForState;
    currentCameraId: number | null;
    promoCameras: PromoCamera[];
    similarCamerasIds: number[];
    isAllCamerasLoaded: boolean;
    isPromoCamerasLoaded: boolean;
    isSimilarCamerasLoaded: boolean;
    requestStatus: RequestStatus;
    camerasError: boolean;
  };
  [SliceName.Reviews]: {
    allCamerasReviews: ReviewsForState;
    requestStatus: RequestStatus;
    reviewsError: boolean;
  };
}

describe('Reviews Selectors', () => {
  const mockReviews = generateReviewsForCameras(3, 5);
  const mockAllReviews = generateReviewsForState(mockReviews);

  const state: State = {
    [SliceName.Cameras]: {
      allCameras: {},
      isAllCamerasLoaded: true,
      currentCameraId: 1,
      promoCameras: [],
      isPromoCamerasLoaded: true,
      similarCamerasIds: [],
      isSimilarCamerasLoaded: true,
      requestStatus: RequestStatus.Success,
      camerasError: false,
    },
    [SliceName.Reviews]: {
      allCamerasReviews: mockAllReviews,
      requestStatus: RequestStatus.Idle,
      reviewsError: false,
    },
  };

  it('getAllCamerasReviews should return allCamerasReviews', () => {
    const { allCamerasReviews } = state[SliceName.Reviews];
    const result = getAllCamerasReviews(state);
    expect(result).toEqual(allCamerasReviews);
  });

  it('getCurrentReviews should return reviews for the current camera', () => {
    const currentCameraId = 1;

    const result = getCurrentReviews(state);
    const expectedReviews = [...mockAllReviews[currentCameraId]].sort(daySort);
    expect(result).toEqual(expectedReviews);
  });

  it('getCurrentReviews should return empty array if current camera has no reviews', () => {
    const currentCameraId = 99;
    const stateWithCurrentCameraId: State = {
      ...state,
      [SliceName.Cameras]: {
        ...state[SliceName.Cameras],
        currentCameraId,
      },
    };

    const result = getCurrentReviews(stateWithCurrentCameraId);
    expect(result).toEqual([]);
  });

  it('getReviewsRequestStatus should return requestStatus', () => {
    const { requestStatus } = state[SliceName.Reviews];
    const result = getReviewsRequestStatus(state);
    expect(result).toBe(requestStatus);
  });

  it('getReviewsError should return reviewsError', () => {
    const { reviewsError } = state[SliceName.Reviews];
    const result = getReviewsError(state);
    expect(result).toBe(reviewsError);
  });
});

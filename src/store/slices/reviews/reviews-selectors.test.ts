import { RequestStatus, SliceName } from '../../../const/const';
import { Cameras, PromoCamera } from '../../../types/camera-type';
import { ReviewsForState } from '../../../types/types';
import {
  generateReviewsForCameras,
  generateReviewsForState,
} from '../../../utils/mock/mock';
import { daySort } from '../../../utils/filter-and-sorting-utils/sorting-utils';
import {
  getAllCamerasReviews,
  getCurrentReviews,
  getReviewsError,
  getReviewsRequestStatus,
} from './reviews-selectors';

interface State {
  [SliceName.Cameras]: {
    allCameras: Cameras;
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

  const createState = (
    reviewsState: Partial<State[typeof SliceName.Reviews]>,
    camerasState: Partial<State[typeof SliceName.Cameras]> = {}
  ): State => ({
    [SliceName.Cameras]: {
      allCameras: [],
      isAllCamerasLoaded: true,
      currentCameraId: 1,
      promoCameras: [],
      isPromoCamerasLoaded: true,
      similarCamerasIds: [],
      isSimilarCamerasLoaded: true,
      requestStatus: RequestStatus.Success,
      camerasError: false,
      ...camerasState,
    },
    [SliceName.Reviews]: {
      allCamerasReviews: mockAllReviews,
      requestStatus: RequestStatus.Idle,
      reviewsError: false,
      ...reviewsState,
    },
  });

  it('getAllCamerasReviews should return allCamerasReviews', () => {
    const state = createState({});
    const { allCamerasReviews } = state[SliceName.Reviews];
    const result = getAllCamerasReviews(state);
    expect(result).toEqual(allCamerasReviews);
  });

  it('getCurrentReviews should return reviews for the current camera', () => {
    const state = createState({});
    const result = getCurrentReviews(state);
    const expectedReviews = [...mockAllReviews[1]].sort(daySort);
    expect(result).toEqual(expectedReviews);
  });

  it('getCurrentReviews should return empty array if current camera has no reviews', () => {
    const state = createState({}, { currentCameraId: 99 });
    const result = getCurrentReviews(state);
    expect(result).toEqual([]);
  });

  it('getCurrentReviews should return empty array if reviews for current camera are empty', () => {
    const state = createState({
      allCamerasReviews: {
        ...mockAllReviews,
        1: [],
      },
    });
    const result = getCurrentReviews(state);
    expect(result).toEqual([]);
  });

  it('getReviewsRequestStatus should return requestStatus', () => {
    const state = createState({ requestStatus: RequestStatus.Loading });
    const result = getReviewsRequestStatus(state);
    expect(result).toBe(RequestStatus.Loading);
  });

  it('getReviewsError should return reviewsError', () => {
    const state = createState({ reviewsError: true });
    const result = getReviewsError(state);
    expect(result).toBe(true);
  });
});

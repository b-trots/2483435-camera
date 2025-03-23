import { ApiActionName, APIRoute, DefaultParam, SliceName } from '../../../const/const';
import { ReviewsType } from '../../../types/types';
import { addReviewToAllCamerasReviews } from './reviews-slice';
import { appCreateAsyncThunk } from '../cameras/cameras-actions';

const fetchOrSetReviewsAction = appCreateAsyncThunk<void | null, number>(
  ApiActionName.FetchReviews,
  async (cameraId, { dispatch, getState, extra: api }) => {
    const state = getState();
    const allCamerasReviews = state[SliceName.Reviews].allCamerasReviews;

    if (!allCamerasReviews[cameraId]) {
      const { data: reviews } = await api.get<ReviewsType>(
        `${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`
      );

      dispatch(
        addReviewToAllCamerasReviews({
          cameraId,
          reviews: reviews || DefaultParam.EmptyArray,
        })
      );
    }
  }
);

export { fetchOrSetReviewsAction };

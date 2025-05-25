import {
  ApiActionName,
  APIRoute,
  ModalType,
  SliceName
} from '@/const/const';
import { NewComment, ReviewsType } from '@/types/types';
import { addReviewToAllCamerasReviews } from './reviews-slice';
import { appCreateAsyncThunk } from '../cameras/cameras-actions';
import { FetchReviewsParam } from '@/types/store-types/slices-types';
import { openModal } from '../modal/modal-slice';

const fetchOrSetReviewsAction = appCreateAsyncThunk<
  void | null,
  FetchReviewsParam
>(
  ApiActionName.FetchReviews,
  async (fetchReviewsParam, { dispatch, getState, extra: api }) => {
    const state = getState();
    const allCamerasReviews = state[SliceName.Reviews].allCamerasReviews;

    if (
      !allCamerasReviews[fetchReviewsParam.cameraId] ||
      fetchReviewsParam.needUpdate
    ) {
      const { data: reviews } = await api.get<ReviewsType>(
        `${APIRoute.Cameras}/${fetchReviewsParam.cameraId}${APIRoute.Reviews}`
      );

      dispatch(
        addReviewToAllCamerasReviews({
          cameraId: fetchReviewsParam.cameraId,
          reviews: reviews || [],
        })
      );
    }
  }
);

const fetchNewReviewAction = appCreateAsyncThunk<void, NewComment>(
  ApiActionName.FetchNewReview,
  async (newComment, { dispatch, extra: api }) => {
    try {
      dispatch(openModal(ModalType.NewReview));
      await api.post<NewComment>(`${APIRoute.Reviews}`, newComment).then(() => {
        dispatch(openModal(ModalType.ReviewSuccess));
        dispatch(
          fetchOrSetReviewsAction({
            cameraId: newComment.cameraId,
            needUpdate: true,
          })
        );
      });
    } catch (error) {
      dispatch(openModal(ModalType.Error));
    }
  }
);

export { fetchOrSetReviewsAction, fetchNewReviewAction };

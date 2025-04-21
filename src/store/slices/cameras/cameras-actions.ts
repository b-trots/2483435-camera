import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/store-types/store-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cameras, FullCamera, PromoCamera } from '../../../types/camera-type';
import {
  ApiActionName,
  APIRoute,
  DefaultParam,
  SliceName,
} from '../../../const/const';
import {
  addCameraToAllCameras,
  setAllCameras,
  setCurrentCameraId,
} from './cameras-slice';

export const appCreateAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

const fetchCamerasAction = appCreateAsyncThunk<void, undefined>(
  ApiActionName.FetchCameras,
  async (_arg, { dispatch, extra: api }) => {
    const { data: cameras } = await api.get<Cameras>(APIRoute.Cameras);

    if (cameras) {
      dispatch(setAllCameras(cameras));
    }
  }
);

const fetchOrSetCameraAction = appCreateAsyncThunk<void, number>(
  ApiActionName.FetchCamera,
  async (cameraId, { dispatch, getState, extra: api }) => {
    const state = getState();
    const allCameras = state[SliceName.Cameras].allCameras;
    const currentId = state[SliceName.Cameras].currentCameraId;

    if (currentId !== cameraId) {
      const activeCamera = allCameras[cameraId];

      if (!activeCamera) {
        const { data: camera } = await api.get<FullCamera>(
          `${APIRoute.Cameras}/${cameraId}`
        );

        if (camera) {
          dispatch(addCameraToAllCameras(camera));
          dispatch(setCurrentCameraId(camera.id));
        }
      } else {
        dispatch(setCurrentCameraId(activeCamera.id));
      }
    }
  }
);

const fetchPromoAction = appCreateAsyncThunk<PromoCamera[], undefined>(
  ApiActionName.FetchPromo,
  async (_arg, { extra: api }) => {
    const { data: promo } = await api.get<PromoCamera[]>(APIRoute.Promo, {
      suppressErrorNotify: true,
    });
    return promo ?? DefaultParam.EmptyArray;
  }
);

const fetchSimilarAction = appCreateAsyncThunk<number[], number | string>(
  ApiActionName.FetchSimilar,
  async (cameraId, { dispatch, getState, extra: api }) => {
    const { data: similarCameras } = await api.get<Cameras>(
      `${APIRoute.Cameras}/${cameraId}${APIRoute.Similar}`,
      {
        suppressErrorNotify: true,
      }
    );
    const state = getState();
    const allCameras = state[SliceName.Cameras].allCameras;

    const similarIds: number[] = [];

    similarCameras.forEach((camera) => {
      similarIds.push(camera.id);

      if (!allCameras[camera.id]) {
        dispatch(addCameraToAllCameras(camera));
      }
    });

    return similarIds;
  }
);
export {
  fetchCamerasAction,
  fetchOrSetCameraAction,
  fetchPromoAction,
  fetchSimilarAction,
};

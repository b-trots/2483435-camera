import { RequestStatus, ServiceParam, SliceName } from '@/const/const';
import { CamerasSlice } from '@/types/store-types/slices-types';
import {
  fetchCamerasAction,
  fetchOrSetCameraAction,
  fetchPromoAction,
  fetchSimilarAction,
} from './cameras-actions';
import { Cameras, FullCamera } from '@/types/camera-type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CameraId = number;

export const camerasState: CamerasSlice = {
  allCameras: [],
  isAllCamerasLoaded: false,
  currentCameraId: null,
  promoCameras: [],
  isPromoCamerasLoaded: false,
  similarCamerasIds: [],
  isSimilarCamerasLoaded: false,
  requestStatus: RequestStatus.Idle,
  camerasError: false,
};

const camerasSlice = createSlice({
  name: SliceName.Cameras,
  initialState: camerasState,
  reducers: {
    setAllCameras: (state, action: PayloadAction<Cameras>) => {
      state.allCameras = action.payload;
    },
    addCameraToAllCameras: (state, action: PayloadAction<FullCamera>) => {
      const camera = action.payload;
      state.allCameras = [...state.allCameras, camera];
    },
    setCurrentCameraId: (state, action: PayloadAction<number>) => {
      state.currentCameraId = action.payload;
    },
    changeCameraReviewCount: (state, action: PayloadAction<CameraId>) => {
      const cameraId = action.payload;
      const cameraIndex = state.allCameras.findIndex(
        (camera) => camera.id === cameraId
      );
      if (cameraIndex) {
        state.allCameras[cameraIndex].reviewCount += ServiceParam.ReviewCountStep;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.camerasError = false;
      })
      .addCase(fetchCamerasAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.isAllCamerasLoaded = true;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.camerasError = true;
      })

      .addCase(fetchOrSetCameraAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.camerasError = false;
      })
      .addCase(fetchOrSetCameraAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOrSetCameraAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.camerasError = true;
      })

      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.isPromoCamerasLoaded = true;
        state.promoCameras = action.payload;
      })

      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.isSimilarCamerasLoaded = true;
        state.similarCamerasIds = action.payload;
      });
  },
});

const {
  setAllCameras,
  addCameraToAllCameras,
  setCurrentCameraId,
  changeCameraReviewCount,
} = camerasSlice.actions;

export {
  camerasSlice,
  setAllCameras,
  addCameraToAllCameras,
  setCurrentCameraId,
  changeCameraReviewCount,
};

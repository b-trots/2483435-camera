import { createSelector } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '@/const/const';
import { State } from '@/types/store-types/store-types';
import { Cameras } from '@/types/camera-type';

export type CamerasState = Pick<State, SliceName.Cameras>;

const getAllCameras = createSelector(
  (state: CamerasState) => state[SliceName.Cameras].allCameras,
  (cameras) => cameras
);

const getIsAllCamerasLoaded = (state: CamerasState): boolean =>
  state[SliceName.Cameras].isAllCamerasLoaded;

const getCurrentCameraId = (state: CamerasState) =>
  state[SliceName.Cameras].currentCameraId;

const getCurrentCamera = createSelector(
  [getAllCameras, getCurrentCameraId],
  (allCameras, currentCameraId) =>
    currentCameraId
      ? allCameras.find((camera) => camera.id === currentCameraId)
      : null
);

const getPromoCameras = createSelector(
  (state: CamerasState) => state[SliceName.Cameras].promoCameras,
  (promoCameras) => promoCameras
);

const getIsPromoCamerasLoaded = (state: CamerasState): boolean =>
  state[SliceName.Cameras].isPromoCamerasLoaded;

const getSimilarCamerasIds = (state: CamerasState) =>
  state[SliceName.Cameras].similarCamerasIds;

const getSimilarCameras = createSelector(
  [getAllCameras, getSimilarCamerasIds],
  (allCameras, similarCamerasIds) => {
    if (!similarCamerasIds.length) {
      return [];
    }
    return similarCamerasIds.reduce<Cameras>((acc, id) => {
      if (allCameras[id]) {
        acc.push(allCameras[id]);
      }
      return acc;
    }, []);
  }
);

const getIsSimilarCamerasLoaded = (state: CamerasState): boolean =>
  state[SliceName.Cameras].isSimilarCamerasLoaded;

const getCamerasRequestStatus = (state: CamerasState): RequestStatus =>
  state[SliceName.Cameras].requestStatus;

const getCamerasError = (state: CamerasState) =>
  state[SliceName.Cameras].camerasError;

export {
  getAllCameras,
  getIsAllCamerasLoaded,
  getCurrentCameraId,
  getCurrentCamera,
  getPromoCameras,
  getIsPromoCamerasLoaded,
  getSimilarCamerasIds,
  getSimilarCameras,
  getIsSimilarCamerasLoaded,
  getCamerasRequestStatus,
  getCamerasError,
};

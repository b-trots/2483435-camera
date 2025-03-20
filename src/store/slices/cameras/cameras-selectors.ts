import { createSelector } from '@reduxjs/toolkit';
import { RequestStatus, ServiceParam, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';
import { selectCameras } from '../../../utils/utils';

const getAllCameras = (state: State) => state[SliceName.Cameras].allCameras;
const getIsAllCamerasLoaded = (state: State): boolean =>
  state[SliceName.Cameras].isAllCamerasLoaded;

const getCurrentCameras = createSelector(
  [getAllCameras, (_state: State, currentPage: number) => currentPage],
  (allCameras, currentPage) =>
    selectCameras(allCameras, currentPage, ServiceParam.ItemsPerPage)
);

const getCurrentCameraId = (state: State) =>
  state[SliceName.Cameras].currentCameraId;

const getCurrentCamera = createSelector(
  [getAllCameras, getCurrentCameraId],
  (allCameras, currentCameraId) =>
    currentCameraId ? allCameras[currentCameraId] : null
);

const getPromoCameras = (state: State) => state[SliceName.Cameras].promoCameras;

const getIsPromoCamerasLoaded = (state: State): boolean =>
  state[SliceName.Cameras].isPromoCamerasLoaded;

const getSimilarCamerasIds = (state: State) =>
  state[SliceName.Cameras].similarCamerasIds;

const getSimilarCameras = createSelector(
  [getAllCameras, getSimilarCamerasIds],
  (allCameras, similarCamerasIds) =>
    similarCamerasIds
      .map((id) => allCameras[id])
      .filter((camera) => camera !== undefined)
);

const getIsSimilarCamerasLoaded = (state: State): boolean =>
  state[SliceName.Cameras].isSimilarCamerasLoaded;

const getCamerasRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Cameras].requestStatus;

const getCamerasError = (state: State) => state[SliceName.Cameras].camerasError;

export {
  getAllCameras,
  getIsAllCamerasLoaded,
  getCurrentCameras,
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

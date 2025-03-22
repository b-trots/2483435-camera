import { createSelector } from '@reduxjs/toolkit';
import { RequestStatus, ServiceParam, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';
import { selectCameras } from '../../../utils/utils';
import { FullCamera } from '../../../types/product-type';

const getAllCameras = createSelector(
  (state: State) => state[SliceName.Cameras].allCameras,
  (cameras) => cameras
);

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

const getPromoCameras = createSelector(
  (state: State) => state[SliceName.Cameras].promoCameras,
  (promoCameras) => promoCameras
);

const getIsPromoCamerasLoaded = (state: State): boolean =>
  state[SliceName.Cameras].isPromoCamerasLoaded;

const getSimilarCamerasIds = (state: State) =>
  state[SliceName.Cameras].similarCamerasIds;

const getSimilarCameras = createSelector(
  [getAllCameras, getSimilarCamerasIds],
  (allCameras, similarCamerasIds) => {
    if (!similarCamerasIds.length) {
      return [];
    }
    return similarCamerasIds.reduce<FullCamera[]>((acc, id) => {
      if (allCameras[id]) {
        acc.push(allCameras[id]);
      }
      return acc;
    }, []);
  }
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

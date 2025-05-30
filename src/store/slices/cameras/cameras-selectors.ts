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
  (allCameras, currentCameraId) => {
    if (!currentCameraId) {
      return null;
    }
    return allCameras.find((camera) => camera.id === currentCameraId) ?? null;
  }
);

const getCameraById = (id: number) => (state: CamerasState) => {
  const cameras = state[SliceName.Cameras].allCameras;
  return cameras.find((camera) => camera.id === id) ?? null;
};

const getPromoCameras = createSelector(
  (state: CamerasState) => state[SliceName.Cameras].promoCameras,
  (promoCameras) => promoCameras
);

const getPromoCamerasIds = createSelector(
  (state: CamerasState) => state[SliceName.Cameras].promoCameras,
  (promoCameras) => promoCameras.map((camera)=>camera.id)
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
      const camera = allCameras.find(
        (currentCamera) => currentCamera.id === id
      );
      if (camera) {
        acc.push(camera);
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
  getCameraById,
  getPromoCamerasIds
};

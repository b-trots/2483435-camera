import { Sorting } from '../const/const';
import { CamerasForState, FullCamera } from '../types/product-type';
import { ReviewType, SortingDirection, SortingType } from '../types/types';
import dayjs from 'dayjs';

const daySort = (reviewA: ReviewType, reviewB: ReviewType) =>
  dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));

const toSort = {
  [Sorting.SortPrice]: (cameraA: FullCamera, cameraB: FullCamera) =>
    cameraA.price - cameraB.price,
  [Sorting.SortPopular]: (cameraA: FullCamera, cameraB: FullCamera) =>
    cameraA.rating - cameraB.rating,
};

const toSortCameras = (
  cameras: CamerasForState,
  sortType: SortingType,
  sortDirection: SortingDirection
) => {
  const isDescending = sortDirection === Sorting.Down;
  const sortedCameras = Object.values(cameras).slice().sort(toSort[sortType]);

  return isDescending ? sortedCameras.reverse() : sortedCameras;
};

export { daySort, toSortCameras };

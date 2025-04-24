import { SortOrder, SortType } from '@/const/sorting-const';
import { Cameras, FullCamera } from '@/types/camera-type';
import dayjs from 'dayjs';
import { ReviewType } from '@/types/types';
import { SortingType, SortingValue } from '@/types/filter-and-sort-types';
import { DefaultParam } from '@/const/const';

const daySort = (reviewA: ReviewType, reviewB: ReviewType) =>
  dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));

const toUpdateSorting = (
  sorting: SortingType,
  id: SortingValue
): SortingType => {
  if (Object.values(SortType).includes(id as SortType)) {
    return { ...sorting, type: id as SortType };
  }

  if (Object.values(SortOrder).includes(id as SortOrder)) {
    return { ...sorting, order: id as SortOrder };
  }

  return sorting;
};

const toSort = {
  [SortType.SortPrice]: (cameraA: FullCamera, cameraB: FullCamera) =>
    (cameraA.price ?? DefaultParam.ZeroValue) -
    (cameraB.price ?? DefaultParam.ZeroValue),

  [SortType.SortPopular]: (cameraA: FullCamera, cameraB: FullCamera) =>
    (cameraA.rating ?? DefaultParam.ZeroValue) -
    (cameraB.rating ?? DefaultParam.ZeroValue),
};

const toSortCameras = (cameras: Cameras, sorting: SortingType) => {
  const isDescending = sorting.order === SortOrder.Down;

  const sortedCameras = cameras.slice().sort(toSort[sorting.type]);

  return isDescending ? sortedCameras.reverse() : sortedCameras;
};

export { daySort, toUpdateSorting, toSortCameras };

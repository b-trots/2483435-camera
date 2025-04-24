import { CameraCategory } from '@/const/camera-const';
import { DefaultParam } from '@/const/const';
import { FilterCameraCategory } from '@/const/filter-const';
import { FilterCameraCategoryType } from '@/types/filter-and-sort-types';
import { capitalize } from '../../utils';

const isPriceInRange = (
  price: number,
  priceFrom: number | null,
  priceTo: number | null
) =>
  (priceFrom === null || price >= priceFrom) &&
  (priceTo === null || price <= priceTo);

const matchesCategory = (
  cameraCategory: CameraCategory,
  filterValue: FilterCameraCategoryType
) =>
  cameraCategory ===
  FilterCameraCategory[
    capitalize(filterValue) as keyof typeof FilterCameraCategory
  ].name;

const matchesArrayFilter = (
  cameraValue: string,
  filterValue: string[],
  filterParameters: Record<string, { name: string }>
) => {
  if (
    !filterValue ||
    !Array.isArray(filterValue) ||
    filterValue.length === DefaultParam.ZeroValue
  ) {
    return true;
  }

  return filterValue.some(
    (value) =>
      cameraValue ===
      filterParameters[capitalize(value) as keyof typeof filterParameters].name
  );
};

const updateFilterArray = <T extends string>(
  filterArray: T[],
  filterKey: T,
  checked: boolean
) =>
    checked
      ? [...filterArray, filterKey]
      : filterArray.filter((item) => item !== filterKey);

export {
  isPriceInRange,
  matchesCategory,
  matchesArrayFilter,
  updateFilterArray,
};

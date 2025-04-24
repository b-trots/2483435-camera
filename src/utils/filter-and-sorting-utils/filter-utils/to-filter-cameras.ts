import {
  FilterCameraLevel,
  FilterCameraType,
  FilterName,
} from '@/const/filter-const';
import { Cameras } from '@/types/camera-type';
import {
  FilterCameraCategoryType,
  FilterCameraLevelType,
  FilterCameraPriceType,
  FilterCameraTypeType,
  FiltersType,
} from '@/types/filter-and-sort-types';
import {
  isPriceInRange,
  matchesArrayFilter,
  matchesCategory,
} from './filter-utils';

const toFilterCameras = (filters: FiltersType, cameras: Cameras) =>
  cameras.filter((camera) => {
    for (const [filterKey, filterValue] of Object.entries(filters)) {
      if (filterKey === FilterName.Price.id && filterValue) {
        const { price: priceFrom = null, priceUp: priceTo = null } =
          filterValue as FilterCameraPriceType;
        if (!isPriceInRange(camera.price, priceFrom, priceTo)) {
          return false;
        }
      } else if (
        filterKey === FilterName.Category.id &&
        filterValue &&
        !matchesCategory(
          camera.category,
          filterValue as FilterCameraCategoryType
        )
      ) {
        return false;
      } else if (
        (filterKey === FilterName.Type.id &&
          !matchesArrayFilter(
            camera[FilterName.Type.id],
            filterValue as FilterCameraTypeType[],
            FilterCameraType
          )) ||
        (filterKey === FilterName.Level.id &&
          !matchesArrayFilter(
            camera[FilterName.Level.id],
            filterValue as FilterCameraLevelType[],
            FilterCameraLevel
          ))
      ) {
        return false;
      }
    }
    return true;
  });
export { toFilterCameras };

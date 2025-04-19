import { Cameras } from '../../../types/camera-type';
import {
  FilterCameraPriceType,
  FiltersType,
} from '../../../types/filter-and-sort-types';
import { toFilterCameras } from './to-filter-cameras';
import { toFindPriceRange } from './to-find-price-range';

const toUpdateValidPriceRange = (
  updatedFilters: FiltersType,
  cameras: Cameras,
  setValidPriceRange?: (range: FilterCameraPriceType) => void
) => {
  const camerasWithoutPriceFilter = toFilterCameras(
    { ...updatedFilters, price: { price: null, priceUp: null } },
    cameras
  );

  const validPriceRange = toFindPriceRange(camerasWithoutPriceFilter);
  const newMinValidPrice = validPriceRange.price;
  const newMaxValidPrice = validPriceRange.priceUp;

  if (setValidPriceRange) {
    setValidPriceRange({ price: newMinValidPrice, priceUp: newMaxValidPrice });
  }

  return { newMinValidPrice, newMaxValidPrice };
};

export { toUpdateValidPriceRange };

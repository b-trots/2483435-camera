import {
  FilterCameraCategory,
  FilterCameraLevel,
  FilterCameraPrice,
  FilterCameraType,
} from '../../../const/filter-const';
import { Cameras } from '../../../types/camera-type';
import {
  FilterCameraCategoryType,
  FilterCameraLevelType, FilterCameraTypeType,
  FiltersType
} from '../../../types/filter-and-sort-types';
import { capitalize } from '../../utils';
import { updateFilterArray } from './filter-utils';
import { toUpdatePriceFilter } from './to-update-price-filter';

const toUpdateFilters = (
  prevFilters: FiltersType,
  e: React.FormEvent<HTMLFormElement>,
  validPriceRange: { price: number | null; priceUp: number | null },
  cameras: Cameras,
): FiltersType => {
  const target = e.target as HTMLInputElement;
  const { name, value, ariaLabel, checked } = target;
  let updatedFilters = { ...prevFilters };

  const minValidPrice = validPriceRange.price;
  const maxValidPrice = validPriceRange.priceUp;

  if (capitalize(name) in FilterCameraPrice) {
    updatedFilters = {
      ...updatedFilters,
      price: toUpdatePriceFilter({
        name,
        value,
        minValidPrice,
        maxValidPrice,
        cameras,
        updatedFilters,
      }),
    };
  }

  if (ariaLabel && capitalize(ariaLabel) in FilterCameraCategory) {
    const isVideocamera = ariaLabel === FilterCameraCategory.Videocamera.id;
    const correctType = isVideocamera
      ? updatedFilters.type.filter(
        (item) =>
          item !== FilterCameraType.Film.id &&
            item !== FilterCameraType.Snapshot.id
      )
      : [...updatedFilters.type];

    updatedFilters = {
      ...updatedFilters,
      category: ariaLabel as FilterCameraCategoryType,
      type: correctType,
    };
  }

  if (capitalize(name) in FilterCameraType) {
    updatedFilters = {
      ...updatedFilters,
      type: updateFilterArray(
        updatedFilters.type,
        name as FilterCameraTypeType,
        checked
      ),
    };
  }

  if (capitalize(name) in FilterCameraLevel) {
    updatedFilters = {
      ...updatedFilters,
      level: updateFilterArray(
        updatedFilters.level,
        name as FilterCameraLevelType,
        checked
      ),
    };
  }

  return updatedFilters;
};

export { toUpdateFilters };

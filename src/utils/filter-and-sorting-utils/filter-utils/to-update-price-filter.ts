import { FilterCameraPrice } from '../../../const/filter-const';
import { Cameras } from '../../../types/camera-type';
import { FiltersType } from '../../../types/filter-and-sort-types';
import { toUpdateValidPriceRange } from './to-update-valid-price-range';

type toUpdatePriceFilterProps = {
  name: string;
  value: string;
  minValidPrice: number | null;
  maxValidPrice: number | null;
  cameras: Cameras;
  updatedFilters: FiltersType;
};

function toUpdatePriceFilter({
  name,
  value,
  cameras,
  updatedFilters,
}: toUpdatePriceFilterProps) {
  const typedName = name;
  const priceValue = value ? parseInt(value, 10) : null;

  const { newMinValidPrice, newMaxValidPrice } = toUpdateValidPriceRange(
    updatedFilters,
    cameras
  );

  const filterMinPrice = updatedFilters.price.price;
  const filterMaxPrice = updatedFilters.price.priceUp;

  if (typedName === FilterCameraPrice.Price.id) {
    if (priceValue === null) {
      updatedFilters.price = {
        ...updatedFilters.price,
        price: null,
      };
    } else if (newMinValidPrice !== null && priceValue < newMinValidPrice) {
      updatedFilters.price = {
        ...updatedFilters.price,
        price: newMinValidPrice,
      };
    } else if (
      newMaxValidPrice !== null &&
      filterMaxPrice === null &&
      priceValue > newMaxValidPrice
    ) {
      updatedFilters.price = {
        ...updatedFilters.price,
        price: newMaxValidPrice,
        priceUp: newMaxValidPrice,
      };
    } else if (filterMaxPrice !== null && priceValue > filterMaxPrice) {
      if (newMaxValidPrice !== null && priceValue > newMaxValidPrice) {
        updatedFilters.price = {
          ...updatedFilters.price,
          price: newMaxValidPrice,
          priceUp: newMaxValidPrice,
        };
      } else if (priceValue > filterMaxPrice) {
        updatedFilters.price = {
          ...updatedFilters.price,
          price: priceValue,
          priceUp: priceValue,
        };
      }
    } else {
      updatedFilters.price = {
        ...updatedFilters.price,
        price: priceValue,
      };
    }
  }

  if (typedName === FilterCameraPrice.PriceUp.id) {
    const priceUpValue = priceValue;

    if (priceUpValue === null) {
      updatedFilters.price = {
        ...updatedFilters.price,
        priceUp: null,
      };
    } else if (newMaxValidPrice !== null && priceUpValue > newMaxValidPrice) {
      updatedFilters.price = {
        ...updatedFilters.price,
        priceUp: newMaxValidPrice,
      };
    } else if (
      newMinValidPrice !== null &&
      filterMinPrice === null &&
      priceUpValue < newMinValidPrice
    ) {
      updatedFilters.price = {
        ...updatedFilters.price,
        price: newMinValidPrice,
        priceUp: newMinValidPrice,
      };
    } else if (filterMinPrice !== null && priceUpValue < filterMinPrice) {
      if (newMinValidPrice !== null && priceUpValue < newMinValidPrice) {
        updatedFilters.price = {
          ...updatedFilters.price,
          price: newMinValidPrice,
          priceUp: newMinValidPrice,
        };
      } else if (priceUpValue < filterMinPrice) {
        updatedFilters.price = {
          ...updatedFilters.price,
          price: priceValue,
          priceUp: priceValue,
        };
      }
    } else {
      updatedFilters.price = {
        ...updatedFilters.price,
        priceUp: priceValue,
      };
    }
  }

  return updatedFilters.price;
}
export { toUpdatePriceFilter };

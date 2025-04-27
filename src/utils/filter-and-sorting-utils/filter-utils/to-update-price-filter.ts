import { ServiceParam } from '@/const/const';
import { FilterCameraPrice } from '@/const/filter-const';
import { Cameras } from '@/types/camera-type';
import { FiltersType } from '@/types/filter-and-sort-types';
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
  const priceValue = value ? parseInt(value, ServiceParam.RadixTen) : null;
  const { newMinValidPrice, newMaxValidPrice } = toUpdateValidPriceRange(
    updatedFilters,
    cameras
  );

  const { price: filterMinPrice, priceUp: filterMaxPrice } =
    updatedFilters.price;

  const updatePrice = (price: number | null, priceUp: number | null) => ({
    ...updatedFilters.price,
    price,
    priceUp,
  });

  if (name === FilterCameraPrice.Price.id) {
    if (priceValue === null) {
      return updatePrice(null, filterMaxPrice);
    }

    if (newMinValidPrice !== null && priceValue < newMinValidPrice) {
      return updatePrice(newMinValidPrice, filterMaxPrice);
    }

    if (
      newMaxValidPrice !== null &&
      filterMaxPrice === null &&
      priceValue > newMaxValidPrice
    ) {
      return updatePrice(newMaxValidPrice, newMaxValidPrice);
    }

    if (filterMaxPrice !== null && priceValue > filterMaxPrice) {
      const newPriceUp = Math.min(priceValue, newMaxValidPrice ?? priceValue);
      return updatePrice(newPriceUp, newPriceUp);
    }

    return updatePrice(priceValue, filterMaxPrice);
  }

  if (name === FilterCameraPrice.PriceUp.id) {
    if (priceValue === null) {
      return updatePrice(filterMinPrice, null);
    }

    if (newMaxValidPrice !== null && priceValue > newMaxValidPrice) {
      return updatePrice(filterMinPrice, newMaxValidPrice);
    }

    if (
      newMinValidPrice !== null &&
      filterMinPrice === null &&
      priceValue < newMinValidPrice
    ) {
      return updatePrice(newMinValidPrice, newMinValidPrice);
    }

    if (filterMinPrice !== null && priceValue < filterMinPrice) {
      const newPrice = Math.max(priceValue, newMinValidPrice ?? priceValue);
      return updatePrice(newPrice, newPrice);
    }

    return updatePrice(filterMinPrice, priceValue);
  }

  return updatedFilters.price;
}

export { toUpdatePriceFilter };

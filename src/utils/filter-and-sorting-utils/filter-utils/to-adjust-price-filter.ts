import { FiltersType } from '../../../types/filter-and-sort-types';

const toAdjustPriceFilter = (
  updatedFilters: FiltersType,
  newMinValidPrice: number | null,
  newMaxValidPrice: number | null
): FiltersType => {
  const filterMinPrice = updatedFilters.price.price;
  const filterMaxPrice = updatedFilters.price.priceUp;

  let price = filterMinPrice;
  let priceUp = filterMaxPrice;

  if (
    filterMinPrice !== null &&
    newMinValidPrice !== null &&
    newMinValidPrice > filterMinPrice
  ) {
    if (filterMaxPrice !== null && newMinValidPrice > filterMaxPrice) {
      price = newMinValidPrice;
      priceUp = newMinValidPrice;
    } else {
      price = newMinValidPrice;
    }
  }

  if (
    filterMaxPrice !== null &&
    newMaxValidPrice !== null &&
    newMaxValidPrice < filterMaxPrice
  ) {
    if (filterMinPrice !== null && newMaxValidPrice < filterMinPrice) {
      price = newMaxValidPrice;
      priceUp = newMaxValidPrice;
    } else {
      priceUp = newMaxValidPrice;
    }
  }

  return (updatedFilters = {
    ...updatedFilters,
    price: {
      ...updatedFilters.price,
      price: price,
      priceUp: priceUp,
    },
  });
};

export { toAdjustPriceFilter };

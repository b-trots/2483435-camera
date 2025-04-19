import { useState, useEffect } from 'react';
import { DefaultParam, Validation, ServiceParam, InputType } from '../const/const';
import { FilterCameraPrice } from '../const/filter-const';
import { FilterItemType } from '../types/filter-and-sort-types';
import { useFilterAndSortingContext } from './use-filters-and-sort/use-filter-and-sort-context';


type usePriceFilterProps = {
  param: FilterItemType['params'][number];
};

export function usePriceFilter({ param }: usePriceFilterProps) {
  const [, value] = param;
  const { validPriceRange, filters, updateFilters } =
    useFilterAndSortingContext();
  const [tempValue, setTempValue] = useState<string>(DefaultParam.EmptyString);

  const isPriceMin = value.id === FilterCameraPrice.Price.id;

  const placeholder = isPriceMin
    ? `${value.name} ${validPriceRange.price ?? DefaultParam.EmptyString}`
    : `${value.name} ${validPriceRange.priceUp ?? DefaultParam.EmptyString}`;

  useEffect(() => {
    const filterValue = isPriceMin
      ? filters.price.price
      : filters.price.priceUp;
    if (filterValue !== null) {
      setTempValue(filterValue.toString());
    }
  }, [filters.price, isPriceMin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const correctInputValue = inputValue.replace(
      Validation.CameraPrice,
      DefaultParam.EmptyString
    );
    setTempValue(correctInputValue);
  };

  const handleBlur = () => {
    const trimmedValue = tempValue.trim();

    if (
      trimmedValue === DefaultParam.EmptyString ||
      isNaN(parseInt(trimmedValue, ServiceParam.RadixTen))
    ) {
      setTempValue(DefaultParam.EmptyString);
    }

    const currentPriceChange = {
      target: {
        name: value.id,
        value: trimmedValue,
      },
    };

    updateFilters(
      currentPriceChange as unknown as React.FormEvent<HTMLFormElement>
    );
  };

  return {
    type: InputType.String,
    name: value.id,
    placeholder,
    value: tempValue,
    onChange: handleInputChange,
    onBlur: handleBlur,
  };
}

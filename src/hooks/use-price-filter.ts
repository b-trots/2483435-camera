import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  DefaultParam,
  Validation,
  ServiceParam,
  InputType,
} from '../const/const';
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

  const placeholder = useMemo(
    () =>
      isPriceMin
        ? `${validPriceRange.price ?? DefaultParam.EmptyString}`
        : `${validPriceRange.priceUp ?? DefaultParam.EmptyString}`,
    [isPriceMin, validPriceRange]
  );

  useEffect(() => {
    const filterValue = isPriceMin
      ? filters.price.price
      : filters.price.priceUp;
    setTempValue(
      filterValue !== null ? filterValue.toString() : DefaultParam.EmptyString
    );
  }, [filters.price, isPriceMin]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const correctInputValue = e.target.value.replace(
        Validation.CameraPrice,
        DefaultParam.EmptyString
      );
      setTempValue(correctInputValue);
    },
    []
  );

  const handleBlur = useCallback(() => {
    const trimmedValue = tempValue.trim();
    const numericValue = parseInt(trimmedValue, ServiceParam.RadixTen);

    if (trimmedValue === DefaultParam.EmptyString || isNaN(numericValue)) {
      setTempValue(DefaultParam.EmptyString);
    }

    const event = {
      target: {
        name: value.id,
        value: trimmedValue,
      },
    } as unknown as React.FormEvent<HTMLFormElement>;

    updateFilters(event);
  }, [tempValue, updateFilters, value.id]);

  return {
    type: InputType.String,
    name: value.id,
    placeholder,
    value: tempValue,
    onChange: handleInputChange,
    onBlur: handleBlur,
  };
}

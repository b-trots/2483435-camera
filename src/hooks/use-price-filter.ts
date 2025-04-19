import { useEffect, useState } from 'react';
import { useFilterAndSortingContext } from './use-filters-and-sort/use-filter-and-sort-context';
import { FilterCameraPrice } from '../const/filter-const';
import { FilterItemType } from '../types/filter-and-sort-types';

type usePriceFilterProps = {
  param: FilterItemType['params'][number];
};

export function usePriceFilter({ param }: usePriceFilterProps) {
  const [, value] = param;
  const { validPriceRange, filters, updateFilters } =
    useFilterAndSortingContext();
  const [tempValue, setTempValue] = useState<string>('');

  const isPriceMin = value.id === FilterCameraPrice.Price.id;

  const placeholder = isPriceMin
    ? `${value.name} ${validPriceRange.price ?? ''}`
    : `${value.name} ${validPriceRange.priceUp ?? ''}`;

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
    const correctInputValue = inputValue.replace(/[^0-9]/g, '');
    setTempValue(correctInputValue);
  };

  const handleBlur = () => {
    const trimmedValue = tempValue.trim();

    if (trimmedValue === '' || isNaN(parseInt(trimmedValue, 10))) {
      setTempValue('');
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
    type: 'string',
    name: value.id,
    placeholder,
    value: tempValue,
    onChange: handleInputChange,
    onBlur: handleBlur,
  };
}

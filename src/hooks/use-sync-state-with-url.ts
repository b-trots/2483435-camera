import { useSearchParams } from 'react-router-dom';
import { FiltersType, SortingType } from '../types/filter-and-sort-types';
import { useEffect, useState } from 'react';
import {
  FILTER_AND_SORT_PARAM,
  FilterAndSortParam
} from '../const/filter-const';
import { DefaultParam } from '../const/const';

const useSyncStateWithUrl = (
  initialFilters: FiltersType,
  initialSorting: SortingType
) => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FiltersType>(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      price: {
        price: params.price || initialFilters.price.price,
        priceUp: params.priceUp || initialFilters.price.priceUp,
      },
      category: params.category || initialFilters.category,
      type: params.type ? params.type.split(',') : initialFilters.type,
      level: params.level ? params.level.split(',') : initialFilters.level,
    } as FiltersType;
  });

  const [sorting, setSorting] = useState<SortingType>(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      type: params.sortType || initialSorting.type,
      order: params.sortOrder || initialSorting.order,
    } as SortingType;
  });

  useEffect(() => {
    const newParams = new URLSearchParams(window.location.search);

    FILTER_AND_SORT_PARAM.forEach((param) => {
      newParams.delete(param);
    });

    if (filters.price.price) {
      newParams.set(FilterAndSortParam.Price, String(filters.price.price));
    }
    if (filters.price.priceUp) {
      newParams.set(FilterAndSortParam.PriceUp, String(filters.price.priceUp));
    }
    if (filters.category) {
      newParams.set(FilterAndSortParam.Category, filters.category);
    }
    if (filters.type?.length) {
      newParams.set(FilterAndSortParam.Type, filters.type.join(','));
    }
    if (filters.level?.length) {
      newParams.set(FilterAndSortParam.Level, filters.level.join(','));
    }

    newParams.set(FilterAndSortParam.SortType, sorting.type);
    newParams.set(FilterAndSortParam.SortOrder, sorting.order);

    const newUrl = `?${newParams.toString()}`;
    if (window.location.search !== newUrl) {
      window.history.replaceState(null, DefaultParam.EmptyString, newUrl);
    }
  }, [filters, sorting]);

  return { filters, setFilters, sorting, setSorting };
};

export { useSyncStateWithUrl };

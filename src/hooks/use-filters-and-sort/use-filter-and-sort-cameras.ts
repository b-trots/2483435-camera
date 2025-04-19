import { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultParam } from '../../const/const';
import { SortOrder, SortType } from '../../const/sorting-const';
import { Cameras } from '../../types/camera-type';
import {
  FiltersType,
  SortingType,
  SortingValue,
} from '../../types/filter-and-sort-types';
import { toFilterCameras } from '../../utils/filter-and-sorting-utils/filter-utils/to-filter-cameras';
import {
  toSortCameras,
  toUpdateSorting,
} from '../../utils/filter-and-sorting-utils/sorting-utils';
import { toFindPriceRange } from '../../utils/filter-and-sorting-utils/filter-utils/to-find-price-range';
import { toUpdateFilters } from '../../utils/filter-and-sorting-utils/filter-utils/to-update-filters';

type UseFilteredAndSortedCamerasParams = {
  cameras: Cameras;
  initialFilters?: FiltersType;
  initialSorting?: SortingType;
};

const initialFilters: FiltersType = {
  price: { price: null, priceUp: null },
  category: null,
  type: DefaultParam.EmptyArray,
  level: DefaultParam.EmptyArray,
};

const initialSorting: SortingType = {
  type: SortType.SortPrice,
  order: SortOrder.Up,
};

const useFilteredAndSortedCameras = ({
  cameras,
}: UseFilteredAndSortedCamerasParams) => {
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [sorting, setSorting] = useState<SortingType>(initialSorting);
  const [validPriceRange, setValidPriceRange] = useState(() =>
    toFindPriceRange(cameras)
  );

  const filteredCameras = useMemo(
    () => toFilterCameras(filters, cameras),
    [filters, cameras]
  );

  const sortedCameras = useMemo(
    () => toSortCameras(filteredCameras, sorting),
    [filteredCameras, sorting]
  );

  useEffect(() => {
    const isFiltersDisabled =
      !filters.category &&
      (!filters.type || filters.type.length === 0) &&
      (!filters.level || filters.level.length === 0);

    const newPriceRange = isFiltersDisabled
      ? toFindPriceRange(cameras)
      : toFindPriceRange(filteredCameras);

    if (
      newPriceRange.price !== validPriceRange.price ||
      newPriceRange.priceUp !== validPriceRange.priceUp
    ) {
      setValidPriceRange(newPriceRange);
    }
  }, [cameras, filters, filteredCameras, validPriceRange]);

  const updateFilters = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      setFilters((prevFilters) =>
        toUpdateFilters(
          prevFilters,
          e,
          validPriceRange,
          cameras,
          setValidPriceRange
        )
      );
    },
    [validPriceRange, cameras]
  );

  const updateSorting = useCallback((id: SortingValue) => {
    setSorting((prevSorting) => toUpdateSorting(prevSorting, id));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const resetSorting = useCallback(() => {
    setSorting(initialSorting);
  }, []);

  return {
    filters,
    sorting,
    updateFilters,
    updateSorting,
    resetFilters,
    resetSorting,
    sortedCameras,
    filteredCameras,
    validPriceRange,
  };
};

export { initialFilters, initialSorting, useFilteredAndSortedCameras };

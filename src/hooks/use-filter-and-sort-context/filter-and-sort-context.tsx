import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SortOrder, SortType } from '@/const/sorting-const';
import { Cameras, CamerasPropType } from '@/types/camera-type';
import {
  FilterCameraPriceType,
  FiltersType,
  SortingType,
  SortingValue,
} from '@/types/filter-and-sort-types';
import { useSyncStateWithUrl } from '../use-sync-state-with-url';
import { toFindPriceRange } from '@/utils/filter-and-sorting-utils/filter-utils/to-find-price-range';
import { toUpdateFilters } from '@/utils/filter-and-sorting-utils/filter-utils/to-update-filters';
import {
  toSortCameras,
  toUpdateSorting,
} from '@/utils/filter-and-sorting-utils/sorting-utils';
import { toFilterCameras } from '@/utils/filter-and-sorting-utils/filter-utils/to-filter-cameras';
import PropTypes from 'prop-types';
import { toUpdateValidPriceRange } from '@/utils/filter-and-sorting-utils/filter-utils/to-update-valid-price-range';

type FilterAndSortContextType = {
  filters: FiltersType;
  sorting: SortingType;
  filteredCameras: Cameras;
  sortedCameras: Cameras;
  validPriceRange: FilterCameraPriceType;
  updateFilters: (e: React.FormEvent<HTMLFormElement>) => void;
  updateSorting: (id: SortingValue) => void;
  resetFilters: () => void;
  resetSorting: () => void;
};

type FilterAndSortProviderProps = {
  children: React.ReactNode;
  cameras: Cameras;
};

const initialFilters: FiltersType = {
  price: { price: null, priceUp: null },
  category: null,
  type: [],
  level: [],
};

const initialSorting: SortingType = {
  type: SortType.SortPrice,
  order: SortOrder.Up,
};

const FilterAndSortContext = createContext<FilterAndSortContextType | null>(
  null
);

const FilterAndSortProvider: React.FC<FilterAndSortProviderProps> = ({
  children,
  cameras,
}) => {
  const { filters, setFilters, sorting, setSorting } = useSyncStateWithUrl(
    initialFilters,
    initialSorting
  );

  const [validPriceRange, setValidPriceRange] = useState(() =>
    toFindPriceRange(cameras)
  );

  useEffect(() => {
    toUpdateValidPriceRange(filters, cameras, setValidPriceRange);
  }, [filters, cameras]);

  const updateFilters = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      setFilters((prevFilters) =>
        toUpdateFilters(prevFilters, e, validPriceRange, cameras)
      );
    },
    [setFilters, validPriceRange, cameras]
  );

  const updateSorting = useCallback(
    (id: SortingValue) => {
      setSorting((prevSorting) => toUpdateSorting(prevSorting, id));
    },
    [setSorting]
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [setFilters]);

  const resetSorting = useCallback(() => {
    setSorting(initialSorting);
  }, [setSorting]);

  const value = useMemo(() => {
    const filteredCameras = toFilterCameras(filters, cameras);
    const sortedCameras = toSortCameras(filteredCameras, sorting);
    return {
      filters,
      sorting,
      filteredCameras,
      sortedCameras,
      validPriceRange,
      updateFilters,
      updateSorting,
      resetFilters,
      resetSorting,
    };
  }, [
    filters,
    sorting,
    cameras,
    validPriceRange,
    updateFilters,
    updateSorting,
    resetFilters,
    resetSorting,
  ]);

  return (
    <FilterAndSortContext.Provider value={value}>
      {children}
    </FilterAndSortContext.Provider>
  );
};

FilterAndSortProvider.propTypes = {
  children: PropTypes.node.isRequired,
  cameras: CamerasPropType,
};

export { FilterAndSortContext, FilterAndSortProvider };

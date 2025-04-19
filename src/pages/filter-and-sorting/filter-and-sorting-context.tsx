import { createContext, useState } from 'react';
import {
  FilterCameraPriceType,
  FiltersType,
  SortingType,
  SortingValue,
} from '../../types/filter-and-sort-types';
import React from 'react';
import {
  initialFilters,
  initialSorting,
  useFilteredAndSortedCameras,
} from '../../hooks/use-filters-and-sort/use-filter-and-sort-cameras';
import { Cameras } from '../../types/camera-type';

type FilterAndSortingContextType = {
  filters: FiltersType;
  sorting: SortingType;
  cameras: Cameras;
  updateFilters: (e: React.FormEvent<HTMLFormElement>) => void;
  updateSorting: (id: SortingValue) => void;
  resetFilters: () => void;
  resetSorting: () => void;
  sortedCameras: Cameras;
  filteredCameras: Cameras;
  setCameras: (cameras: Cameras) => void;
  validPriceRange: FilterCameraPriceType;
};

type FilterAndSortingProviderProps = {
  children: React.ReactNode;
};

const FilterAndSortingContext =
  createContext<FilterAndSortingContextType | null>(null);

const FilterAndSortingProvider: React.FC<FilterAndSortingProviderProps> = ({
  children,
}) => {
  const [cameras, setCameras] = useState<Cameras>([]);
  const {
    filters,
    sorting,
    updateFilters,
    updateSorting,
    resetFilters,
    resetSorting,
    sortedCameras,
    filteredCameras,
    validPriceRange,
  } = useFilteredAndSortedCameras({
    cameras,
    initialFilters,
    initialSorting,
  });

  return (
    <FilterAndSortingContext.Provider
      value={{
        filters,
        sorting,
        cameras: sortedCameras,
        updateFilters,
        updateSorting,
        resetFilters,
        resetSorting,
        sortedCameras,
        filteredCameras,
        setCameras,
        validPriceRange,
      }}
    >
      {children}
    </FilterAndSortingContext.Provider>
  );
};

export { FilterAndSortingContext, FilterAndSortingProvider };

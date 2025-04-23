import { createContext, useState } from 'react';
import {
  FilterCameraPriceType,
  FiltersType,
  SortingType,
  SortingValue,
} from '../../../types/filter-and-sort-types';
import React from 'react';
import {
  initialFilters,
  initialSorting,
  useFiltersAndSort,
} from '../../../hooks/use-filters-and-sort/use-filters-and-sort';
import { Cameras } from '../../../types/camera-type';
import { DefaultParam } from '../../../const/const';

type FilterAndSortContextType = {
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

type FilterAndSortProviderProps = {
  children: React.ReactNode;
};

const FilterAndSortContext =
  createContext<FilterAndSortContextType | null>(null);

const FilterAndSortProvider: React.FC<FilterAndSortProviderProps> = ({
  children,
}) => {
  const [cameras, setCameras] = useState<Cameras>(DefaultParam.EmptyArray);
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
  } = useFiltersAndSort({
    cameras,
    initialFilters,
    initialSorting,
  });

  return (
    <FilterAndSortContext.Provider
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
    </FilterAndSortContext.Provider>
  );
};

export { FilterAndSortContext, FilterAndSortProvider };

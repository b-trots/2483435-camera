import { FilterName } from '@/const/filter-const';
import {
  FilterCameraLevelType,
  FilterCameraTypeType,
  FilterNameRus,
  FiltersType,
  FiltersValues,
} from '../../../types/filter-and-sort-types';

function isFilterChecked(
  filters: FiltersType,
  filterName: FilterNameRus,
  value: FiltersValues
): boolean {
  switch (filterName) {
    case FilterName.Price.name: {
      return false;
    }

    case FilterName.Category.name:
      return filters[FilterName.Category.id] === value;

    case FilterName.Type.name:
      return (
        filters[FilterName.Type.id]?.includes(value as FilterCameraTypeType) ??
        false
      );

    case FilterName.Level.name:
      return (
        filters[FilterName.Level.id]?.includes(
          value as FilterCameraLevelType
        ) ?? false
      );

    default:
      return false;
  }
}

export { isFilterChecked };

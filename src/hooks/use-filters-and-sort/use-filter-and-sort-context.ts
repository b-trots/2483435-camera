import { useContext } from 'react';
import { FilterAndSortingContext } from '../../pages/filter-and-sorting/filter-and-sorting-context';

const useFilterAndSortingContext = () => {
  const context = useContext(FilterAndSortingContext);
  if (context === null) {
    throw new Error(
      'useFilterAndSortingContext must be used within a FilterAndSortingProvider'
    );
  }
  return context;
};
export { useFilterAndSortingContext };

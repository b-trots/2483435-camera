import { useContext } from 'react';
import { FilterAndSortContext } from '../../pages/catalog/filter-and-sorting/filter-and-sort-context';
import { ErrorInfoMessage } from '../../const/const';

const useFilterAndSortContext = () => {
  const context = useContext(FilterAndSortContext);
  if (context === null) {
    throw new Error(ErrorInfoMessage.ErrorFilterAndSortingContext);
  }
  return context;
};
export { useFilterAndSortContext };

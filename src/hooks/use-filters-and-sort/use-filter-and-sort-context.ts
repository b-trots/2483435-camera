import { useContext } from 'react';
import { FilterAndSortingContext } from '../../pages/catalog/filter-and-sorting/filter-and-sorting-context';
import { ErrorInfoMessage } from '../../const/const';

const useFilterAndSortingContext = () => {
  const context = useContext(FilterAndSortingContext);
  if (context === null) {
    throw new Error(ErrorInfoMessage.ErrorFilterAndSortingContext);
  }
  return context;
};
export { useFilterAndSortingContext };

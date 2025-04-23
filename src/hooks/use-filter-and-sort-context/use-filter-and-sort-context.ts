import { useContext } from 'react';
import { ErrorInfoMessage } from '../../const/const';
import { FilterAndSortContext } from './filter-and-sort-context';

const useFilterAndSortContext = () => {
  const context = useContext(FilterAndSortContext);
  if (context === null) {
    throw new Error(ErrorInfoMessage.ErrorFilterAndSortingContext);
  }
  return context;
};
export { useFilterAndSortContext };

import { Sorting } from '../../../const/const';
import { SortItemId } from '../../../pages/catalog/sorting/sorting-item';
import { AppDispatch } from '../../../types/store-types/store-types';
import { SortingDirection } from '../../../types/types';
import { setSortDirection, setSortType } from './active-slice';

const isDirection = (param: SortItemId): param is SortingDirection =>
  param === Sorting.Up || param === Sorting.Down;

const setSortParams = (param: SortItemId, dispatch: AppDispatch) => {
  if (isDirection(param)) {
    dispatch(setSortDirection(param));
  } else {
    dispatch(setSortType(param));
  }
};

export { setSortParams };

import { useLocation } from 'react-router-dom';
import { ExplanationWord, SORTING } from '../../../const/const';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setSortParams } from '../../../store/slices/active/active-actions';
import {
  getSortDirection,
  getSortType,
} from '../../../store/slices/active/active-selectors';
import { SortingItem, SortItemId } from './sorting-item';
import { useEffect } from 'react';
import { resetSortParams } from '../../../store/slices/active/active-slice';

export function SortComponent() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);

  useEffect(() => {
    dispatch(resetSortParams());
  }, [location.pathname, dispatch]);

  const handleSortChange = (id: SortItemId) => {
    setSortParams(id, dispatch);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">{ExplanationWord.ToSort}</p>

          <div className="catalog-sort__type">
            {SORTING.type.map((sortInfo) => (
              <SortingItem
                sortInfo={sortInfo}
                key={sortInfo.id}
                active={sortType}
                onChange={handleSortChange}
              />
            ))}
          </div>

          <div className="catalog-sort__order">
            {SORTING.direction.map((sortInfo) => (
              <SortingItem
                sortInfo={sortInfo}
                key={sortInfo.id}
                active={sortDirection}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

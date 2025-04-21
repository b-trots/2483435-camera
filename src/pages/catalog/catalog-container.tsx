import { useEffect } from 'react';
import { ServiceParam, SHOP_TITLE } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getAllCameras,
  getIsAllCamerasLoaded,
} from '../../store/slices/cameras/cameras-selectors';
import { CatalogCards } from './catalog-cards';
import { FilterComponent } from './filter-and-sorting/filters/filter-component';
import { Pagination } from './pagination/pagination';
import { SortingComponent } from './filter-and-sorting/sorting/sorting-component';
import { fetchCamerasAction } from '../../store/slices/cameras/cameras-actions';
import { useLocation } from 'react-router-dom';
import { useFilterAndSortingContext } from '../../hooks/use-filters-and-sort/use-filter-and-sort-context';

export function CatalogContainer() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const allCameras = useAppSelector(getAllCameras);
  const isCamerasLoaded = useAppSelector(getIsAllCamerasLoaded);
  const { filteredCameras, setCameras, resetFilters, resetSorting } =
    useFilterAndSortingContext();

  const isSinglePage = filteredCameras.length <= ServiceParam.CamerasPerPage;

  useEffect(() => {
    if (!isCamerasLoaded) {
      dispatch(fetchCamerasAction());
      return;
    }
    setCameras(allCameras);
  }, [dispatch, isCamerasLoaded, setCameras, allCameras]);

  useEffect(() => {
    resetFilters();
    resetSorting();
  }, [location.pathname, resetFilters, resetSorting]);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">{SHOP_TITLE}</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            {/* <img src="img/banner.png" /> */}
            <FilterComponent />
          </div>
          <div className="catalog__content">
            <SortingComponent />
            <CatalogCards />
            {!isSinglePage && <Pagination />}
          </div>
        </div>
      </div>
    </section>
  );
}

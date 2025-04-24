import { ServiceParam, SHOP_TITLE } from '@/const/const';
import { CatalogCards } from './catalog-cards';
import { FilterComponent } from './filter-and-sorting/filters/filter-component';
import { Pagination } from './pagination/pagination';
import { SortingComponent } from './filter-and-sorting/sorting/sorting-component';
import { useFilterAndSortContext } from '@/hooks/use-filter-and-sort-context/use-filter-and-sort-context';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function CatalogContainer() {
  const location = useLocation();
  const { filteredCameras, resetFilters, resetSorting } =
    useFilterAndSortContext();
  const isSinglePage = filteredCameras.length <= ServiceParam.CamerasPerPage;

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

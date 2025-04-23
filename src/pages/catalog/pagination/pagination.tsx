import { DefaultParam, NameSpace, ServiceParam } from '../../../const/const';
import { useAppSelector } from '../../../hooks/hooks';
import { useFilterAndSortContext } from '../../../hooks/use-filter-and-sort-context/use-filter-and-sort-context';
import { usePagination } from '../../../hooks/use-pagination';
import { getIsAllCamerasLoaded } from '../../../store/slices/cameras/cameras-selectors';
import { PaginationItem } from './pagination-item';

export function Pagination() {
  const { filteredCameras } = useFilterAndSortContext();
  const isCamerasLoaded = useAppSelector(getIsAllCamerasLoaded);
  const { currentPage, pagesNames, goToPage } = usePagination(
    NameSpace.CatalogPageSearchId,
    filteredCameras,
    ServiceParam.CamerasPerPage
  );

  const isVoid =
    !isCamerasLoaded ||
    filteredCameras.length === DefaultParam.ZeroValue ||
    !pagesNames;

  return isVoid ? null : (
    <div className="pagination">
      <ul className="pagination__list">
        {pagesNames.map((pageName) => (
          <PaginationItem
            pageName={pageName}
            key={pageName}
            currentPage={currentPage}
            onClick={goToPage}
          />
        ))}
      </ul>
    </div>
  );
}

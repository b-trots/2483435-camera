import { DefaultParam, NameSpace, ServiceParam } from '../../../const/const';
import { useAppSelector } from '../../../hooks/hooks';
import { usePagination } from '../../../hooks/use-pagination';
import { getAllCameras, getIsAllCamerasLoaded } from '../../../store/slices/cameras/cameras-selectors';
import { createPagesNames } from '../../../utils/utils';
import { PaginationItem } from './pagination-item';


export function Pagination() {
  const allCameras = useAppSelector(getAllCameras);
  const isCamerasLoaded = useAppSelector(getIsAllCamerasLoaded);
  const { currentPage, pagesCount, goToPage } = usePagination(
    NameSpace.CatalogPageSearchId,
    Object.values(allCameras),
    ServiceParam.ItemsPerPage
  );
  const pagesNames = createPagesNames(pagesCount);

  const isVoid =
    !isCamerasLoaded ||
    Object.keys(allCameras).length === DefaultParam.ZeroValue;

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

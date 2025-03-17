import { PaginationItem } from './pagination-item';
import {
  getAllProducts,
  getIsAllProductsLoaded,
} from '../../../store/slices/products/products-selectors';
import { createPagesNames } from '../../../utils/utils';
import { useAppSelector } from '../../../hooks/hooks';
import { DefaultParam, NameSpace, ServiceParam } from '../../../const/const';
import { usePagination } from '../../../hooks/use-pagination';

export function Pagination() {
  const allProducts = useAppSelector(getAllProducts);
  const isProductsLoaded = useAppSelector(getIsAllProductsLoaded);
  const { currentPage, pagesCount, goToPage } = usePagination(
    NameSpace.CatalogPageSearchId,
    Object.values(allProducts),
    ServiceParam.ItemsPerPage
  );
  const pagesNames = createPagesNames(pagesCount);

  const isVoid =
    !isProductsLoaded ||
    Object.keys(allProducts).length === DefaultParam.ZeroValue;

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

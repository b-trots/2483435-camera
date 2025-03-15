import { useSearchParams } from 'react-router-dom';
import { PaginationItem } from './pagination-item';
import {
  getAllProducts,
  getIsAllProductsLoad,
} from '../../../store/slices/products/products-selectors';
import { countPages, createPagesNames } from '../../../utils/utils';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { DefaultParam } from '../../../const/const';

export function Pagination() {
  const allProducts = useAppSelector(getAllProducts);
  const isProductsLoaded = useAppSelector(getIsAllProductsLoad);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    Number(searchParams.get('page')) || DefaultParam.PageNumberZero;
  const pagesCount = countPages(allProducts);
  const pagesNames = createPagesNames(pagesCount);

  useEffect(() => {
    if (currentPage <= 0 || currentPage > pagesCount) {
      setSearchParams({ page: String(DefaultParam.PageNumberFirst) });
    }
  }, [setSearchParams, currentPage, pagesCount]);

  return !isProductsLoaded ? null : (
    <div className="pagination">
      <ul className="pagination__list">
        {pagesNames.map((pageName) => (
          <PaginationItem
            pageName={pageName}
            key={pageName}
            currentPage={currentPage}
          />
        ))}
      </ul>
    </div>
  );
}

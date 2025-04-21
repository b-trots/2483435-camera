import { useSearchParams } from 'react-router-dom';
import { countPages } from '../utils/utils';
import { DefaultParam, ServiceParam } from '../const/const';
import { Cameras } from '../types/camera-type';
import { createPaginationButtonsNames } from '../utils/create-pagination-buttons-names';
import { PaginationButton } from '../const/const-button';
import { useFilterAndSortingContext } from './use-filters-and-sort/use-filter-and-sort-context';
import { useEffect, useRef } from 'react';

type QuantityType = typeof ServiceParam.CamerasPerPage;

function usePagination(
  urlId: string = DefaultParam.UrlId,
  cameras: Cameras = DefaultParam.EmptyArray,
  quantity: QuantityType = ServiceParam.CamerasPerPage
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    searchParams.get(urlId) || String(DefaultParam.PageNumberOne);
  const pagesCount = countPages(cameras, quantity);
  const pagesNames = createPaginationButtonsNames(pagesCount, currentPage);
  const { filters } = useFilterAndSortingContext();
  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      if (currentPage !== String(DefaultParam.PageNumberOne)) {
        setSearchParams(
          { [urlId]: String(DefaultParam.PageNumberOne) },
          { replace: true }
        );
      }
      prevFiltersRef.current = filters;
    }
  }, [filters, currentPage, urlId, setSearchParams]);

  const goToPage = (pageName: string) => {
    const currentPageNum = Number(currentPage);

    if (pageName === PaginationButton.Back) {
      const newPage = Math.max(
        DefaultParam.PageNumberOne,
        Math.floor(
          (currentPageNum - ServiceParam.PageStep) /
            ServiceParam.PaginationButtonsPack
        ) * ServiceParam.LastNumberPageInPack
      );
      setSearchParams({ [urlId]: String(newPage) });
    } else if (pageName === PaginationButton.Next) {
      const newPage = Math.min(
        pagesCount,
        Math.ceil(currentPageNum / ServiceParam.PaginationButtonsPack) *
          ServiceParam.LastNumberPageInPack +
          ServiceParam.PaginationStep
      );
      setSearchParams({ [urlId]: String(newPage) });
    } else {
      setSearchParams({ [urlId]: pageName });
    }
  };

  return { currentPage, pagesCount, pagesNames, goToPage };
}

export { usePagination };

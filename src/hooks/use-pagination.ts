import { useSearchParams } from 'react-router-dom';
import { countPages } from '../utils/utils';
import { DefaultParam, ServiceParam } from '../const/const';

type QuantityType = ServiceParam.ItemsPerPage | ServiceParam.ItemsPerSlide;

export function usePagination(
  urlId: string = DefaultParam.UrlId,
  products: unknown[] = DefaultParam.EmptyArray,
  quantity: QuantityType = ServiceParam.ItemsPerPage,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    Number(searchParams.get(urlId)) || DefaultParam.PageNumberOne;

  const pagesCount = countPages(products, quantity);

  const goToPage = (page: number) => {
    if (page > 0 && page <= pagesCount) {
      setSearchParams({ [urlId]: String(page) });
    } else {
      setSearchParams({ [urlId]: String(DefaultParam.PageNumberOne) });
    }
  };

  return { currentPage, pagesCount, goToPage };
}

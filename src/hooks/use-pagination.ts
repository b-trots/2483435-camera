import { useSearchParams } from 'react-router-dom';
import { countPages } from '../utils/utils';
import { DefaultParam, ServiceParam, NameSpace } from '../const/const';

type QuantityType =
  | typeof ServiceParam.ItemsPerPage
  | typeof ServiceParam.ItemsPerSlide;

export function usePagination(
  urlId: string = DefaultParam.UrlId,
  cameras: unknown[] = DefaultParam.EmptyArray,
  quantity: QuantityType = ServiceParam.ItemsPerPage
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    Number(searchParams.get(urlId)) || DefaultParam.PageNumberOne;

  const pagesCount = countPages(cameras, quantity);

  const goToPage = (page: number) => {
    if (page > NameSpace.FirstPage && page <= pagesCount) {
      setSearchParams({ [urlId]: String(page) });
    } else {
      setSearchParams({ [urlId]: String(DefaultParam.PageNumberOne) });
    }
  };

  return { currentPage, pagesCount, goToPage };
}

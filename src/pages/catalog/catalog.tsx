import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Banner } from '../../components/main/banner/banner';
import { Breadcrumbs } from '../../components/main/breadcrumbs/breadcrumbs';
import {
  useAppDispatch,
  useAppSelector,
  useScrollToTop,
} from '../../hooks/hooks';
import { useChangeTitle } from '../../hooks/use-change-title';
import { TitleName } from '../../const/const';
import { CatalogContainer } from './catalog-container';
import {
  getAllCameras,
  getIsAllCamerasLoaded,
} from '../../store/slices/cameras/cameras-selectors';
import { useEffect } from 'react';
import { fetchCamerasAction } from '../../store/slices/cameras/cameras-actions';
import { FilterAndSortProvider } from '../../hooks/use-filter-and-sort-context/filter-and-sort-context';
export function Catalog() {
  useChangeTitle(TitleName.Catalog);
  useScrollToTop();
  const dispatch = useAppDispatch();
  const allCameras = useAppSelector(getAllCameras);
  const isCamerasLoaded = useAppSelector(getIsAllCamerasLoaded);

  useEffect(() => {
    if (!isCamerasLoaded) {
      dispatch(fetchCamerasAction());
    }
  }, [dispatch, isCamerasLoaded, allCameras]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <FilterAndSortProvider cameras={allCameras}>
            <CatalogContainer />
          </FilterAndSortProvider>
        </div>
      </main>
      <Footer />
    </div>
  );
}

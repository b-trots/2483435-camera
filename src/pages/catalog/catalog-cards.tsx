import { NameSpace, RequestCategory, RequestStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getCamerasError,
  getCamerasRequestStatus,
  getCurrentCameras,
  getIsAllCamerasLoaded,
} from '../../store/slices/cameras/cameras-selectors';
import { useEffect } from 'react';
import { fetchCamerasAction } from '../../store/slices/cameras/cameras-actions';
import { ProductCard } from '../../components/main/product-card/product-card';
import { LoadData } from '../../components/load-data/load-data';
import { usePagination } from '../../hooks/use-pagination';

export function CatalogCards() {
  const dispatch = useAppDispatch();
  const { currentPage } = usePagination(NameSpace.CatalogPageSearchId);
  const currentCameras = useAppSelector((state) =>
    getCurrentCameras(state, currentPage)
  );

  const camerasLoadStatus = useAppSelector(getCamerasRequestStatus);
  const isCamerasLoad = camerasLoadStatus === RequestStatus.Loading;
  const isCamerasLoaded = useAppSelector(getIsAllCamerasLoaded);
  const productsError = useAppSelector(getCamerasError);

  useEffect(() => {
    if (!isCamerasLoaded) {
      dispatch(fetchCamerasAction());
    }
  }, [dispatch, isCamerasLoaded]);

  return productsError || isCamerasLoad ? (
    <div>
      <LoadData
        requestCategory={RequestCategory.Cameras}
        loading={isCamerasLoad}
        error={productsError}
      />
    </div>
  ) : (
    <div className="cards catalog__cards">
      {currentCameras.map((camera) => (
        <ProductCard camera={camera} key={camera.id} />
      ))}
    </div>
  );
}

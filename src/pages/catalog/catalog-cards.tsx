import {
  NameSpace,
  RequestCategory,
  RequestStatus,
  ServiceParam,
} from '@/const/const';
import { useAppSelector } from '@/hooks/hooks';
import {
  getCamerasError,
  getCamerasRequestStatus,
} from '@/store/slices/cameras/cameras-selectors';
import { ProductCard } from '@/components/main/product-card/product-card';
import { LoadData } from '@/components/load-data/load-data';
import { usePagination } from '@/hooks/use-pagination';
import { selectCameras } from '@/utils/utils';
import { useFilterAndSortContext } from '@/hooks/use-filter-and-sort-context/use-filter-and-sort-context';

export function CatalogCards() {
  const { currentPage } = usePagination(NameSpace.CatalogPageSearchId);
  const { sortedCameras } = useFilterAndSortContext();
  const camerasLoadStatus = useAppSelector(getCamerasRequestStatus);
  const isCamerasLoading = camerasLoadStatus === RequestStatus.Loading;
  const productsError = useAppSelector(getCamerasError);
  const currentCameras = selectCameras(
    sortedCameras,
    currentPage,
    ServiceParam.CamerasPerPage
  );

  return productsError || isCamerasLoading ? (
    <div>
      <LoadData
        requestCategory={RequestCategory.Cameras}
        loading={isCamerasLoading}
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

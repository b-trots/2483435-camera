import { useParams } from 'react-router-dom';
import {
  DefaultParam,
  RequestCategory,
  RequestStatus,
  TitleName,
} from '../../const/const';
import {
  useAppSelector,
  useProductData,
  useScrollToTop,
} from '../../hooks/hooks';
import { useChangeTitle } from '../../hooks/use-change-title';
import {
  getCamerasError,
  getCamerasRequestStatus,
  getCurrentCamera,
} from '../../store/slices/cameras/cameras-selectors';
import { Header } from '../../components/header/header';
import { LoadData } from '../../components/load-data/load-data';
import { ProductContent } from './product-content';
import { UpButton } from '../../components/main/buttons/up-button';
import { Footer } from '../../components/footer/footer';

export function Product() {
  const currentCamera = useAppSelector(getCurrentCamera);
  const productLoadStatus = useAppSelector(getCamerasRequestStatus);
  const isProductLoading = productLoadStatus === RequestStatus.Loading;
  const productError = useAppSelector(getCamerasError);

  useChangeTitle(currentCamera?.name || TitleName.Void);
  useScrollToTop();

  const { id = DefaultParam.EmptyString } = useParams();
  useProductData(id, currentCamera);

  const isLoadData = productError || isProductLoading;

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          {isLoadData ? (
            <LoadData
              requestCategory={RequestCategory.Camera}
              loading={isProductLoading}
              error={productError}
            />
          ) : (
            <ProductContent currentCamera={currentCamera} />
          )}
        </div>
      </main>
      <UpButton />
      <Footer />
    </div>
  );
}

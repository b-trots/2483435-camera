import { useParams } from 'react-router-dom';
import { RequestCategory, RequestStatus, TitleName } from '../../const/const';
import { useAppDispatch, useAppSelector, useScrollToTop } from '../../hooks/hooks';
import { useChangeTitle } from '../../hooks/use-change-title';
import { getCamerasError, getCamerasRequestStatus, getCurrentCamera } from '../../store/slices/cameras/cameras-selectors';
import { useEffect } from 'react';
import { fetchOrSetCameraAction, fetchSimilarAction } from '../../store/slices/cameras/cameras-actions';
import { Header } from '../../components/header/header';
import { LoadData } from '../../components/load-data/load-data';
import { ProductContent } from './product-content';
import { UpButton } from '../../components/main/buttons/up-button';
import { Footer } from '../../components/footer/footer';

export function Product() {
  const dispatch = useAppDispatch();
  const currentCamera = useAppSelector(getCurrentCamera);
  const productLoadStatus = useAppSelector(getCamerasRequestStatus);
  const isProductLoad = productLoadStatus === RequestStatus.Loading;
  const productError = useAppSelector(getCamerasError);

  useChangeTitle(currentCamera?.name || TitleName.Void);
  useScrollToTop();

  const { id = '' } = useParams();

  useEffect(() => {
    if (!currentCamera || currentCamera?.id !== Number(id)) {
      dispatch(fetchOrSetCameraAction(Number(id)));
      dispatch(fetchSimilarAction(Number(id)));
    }
  }, [id, dispatch, currentCamera]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          {productError || isProductLoad ? (
            <div>
              <LoadData
                requestCategory={RequestCategory.Camera}
                loading={isProductLoad}
                error={productError}
              />
            </div>
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

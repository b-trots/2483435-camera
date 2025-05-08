import { useParams } from 'react-router-dom';
import {
  DefaultParam,
  RequestCategory,
  RequestStatus,
} from '@/const/const';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  getCamerasError,
  getCamerasRequestStatus,
  getCurrentCamera,
} from '@/store/slices/cameras/cameras-selectors';
import { Header } from '@/components/header/header';
import { LoadData } from '@/components/load-data/load-data';
import { ProductContent } from './product-content';
import { UpButton } from '@/components/main/buttons/up-button';
import { Footer } from '@/components/footer/footer';
import { useCallback, useEffect } from 'react';
import { setCurrentCameraId } from '@/store/slices/cameras/cameras-slice';

export function Product() {
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCurrentCamera);
  const productLoadStatus = useAppSelector(getCamerasRequestStatus);
  const isProductLoading = productLoadStatus === RequestStatus.Loading;
  const productError = useAppSelector(getCamerasError);

  const { id = DefaultParam.EmptyString } = useParams();

  const loadData = useCallback(() => {
    if (id) {
      dispatch(setCurrentCameraId(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isLoadData = productError || isProductLoading || !camera;

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
            <ProductContent camera={camera} />
          )}
        </div>
      </main>
      <UpButton />
      <Footer />
    </div>
  );
}

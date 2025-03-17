import { useParams } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useChangeTitle } from '../../hooks/use-change-title';
import { RequestStatus, TitleName } from '../../const/const';
import { UpButton } from '../../components/main/buttons/up-button';
import {
  useAppDispatch,
  useAppSelector,
  useScrollToTop,
} from '../../hooks/hooks';
import { useEffect } from 'react';
import { fetchOrSetProductAction, fetchSimilarAction } from '../../store/api-actions/api-actions';
import {
  getCurrentProduct,
  getProductsError,
  getProductsRequestStatus,
} from '../../store/slices/products/products-selectors';
import {
  LoadData,
  RequestCategory,
} from '../../components/load-data/load-data';
import { ProductContent } from './product-content';

export function Product() {
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(getCurrentProduct);
  const productLoadStatus = useAppSelector(getProductsRequestStatus);
  const isProductLoad = productLoadStatus === RequestStatus.Loading;
  const productError = useAppSelector(getProductsError);

  useChangeTitle(currentProduct?.name || TitleName.Void);
  useScrollToTop();

  const { id = '' } = useParams();

  useEffect(() => {
    if (currentProduct?.id !== Number(id)) {
      dispatch(fetchOrSetProductAction(Number(id)));
      dispatch(fetchSimilarAction(Number(id)));
    }
  }, [id, dispatch, currentProduct]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          {productError || isProductLoad ? (
            <div>
              <LoadData
                requestCategory={RequestCategory.Product}
                loading={isProductLoad}
                error={productError}
              />
            </div>
          ) : (
            <ProductContent currentProduct={currentProduct} />
          )}
        </div>
      </main>
      <UpButton />
      <Footer />
    </div>
  );
}

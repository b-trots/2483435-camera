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
import { fetchOrSetProductAction } from '../../store/api-actions/api-actions';
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
import { Page404 } from '../../components/page-404/page-404';
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
    if (id) {
      dispatch(fetchOrSetProductAction(Number(id)));
    }
  }, [id, dispatch]);

  if (!currentProduct && !id) {
    return <Page404 />;
  }

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

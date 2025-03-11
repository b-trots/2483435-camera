import {
  LoadData,
  RequestCategory,
} from '../../components/main/load-data/load-data';
import { ProductCard } from '../../components/main/product-card/product-card';
import { RequestStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchOrSetProductAction } from '../../store/api-actions/api-actions';
import {
  getAllProducts,
  getCurrentProduct,
  getProductsError,
  getProductsRequestStatus,
} from '../../store/slices/products/products-selectors';

export function CatalogCards() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getAllProducts);
  const currentProduct = useAppSelector(getCurrentProduct);
  const productsLoadStatus = useAppSelector(getProductsRequestStatus);
  const isProductsLoad = productsLoadStatus === RequestStatus.Loading;
  const productsError = useAppSelector(getProductsError);

  const handleProductCardButtonsClick = (id: number) => {
    if (currentProduct?.id !== id) {
      dispatch(fetchOrSetProductAction(Number(id)));
    }
  };

  return productsError || isProductsLoad ? (
    <div>
      <LoadData
        requestCategory={RequestCategory.Products}
        loading={isProductsLoad}
        error={productsError}
      />
    </div>
  ) : (
    <div className="cards catalog__cards">
      {Object.values(allProducts).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleProductCardButtonsClick}
        />
      ))}
    </div>
  );
}

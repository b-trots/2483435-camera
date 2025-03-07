import { Loading } from '../../components/main/loading';
import { ProductCard } from '../../components/main/product-card/product-card';
import { BooleanStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchOrSetProductAction } from '../../store/api-actions/api-actions';
import {
  getAllProducts,
  getCurrentProduct,
  getIsAllProductsLoad,
} from '../../store/slices/products/products-selectors';

export function CatalogCards() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getAllProducts);
  const currentProduct = useAppSelector(getCurrentProduct);
  const productsLoadStatus = useAppSelector(getIsAllProductsLoad);
  const isProductsLoaded = productsLoadStatus === BooleanStatus.True;

  const handleProductCardButtonsClick = (id: number) => {
    if (currentProduct?.id !== id) {
      dispatch(fetchOrSetProductAction(Number(id)));
    }
  };

  return (
    <div className="cards catalog__cards">
      {!isProductsLoaded ? (
        <Loading />
      ) : (
        Object.values(allProducts).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleProductCardButtonsClick}
          />
        ))
      )}
    </div>
  );
}

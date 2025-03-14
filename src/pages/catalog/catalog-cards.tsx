import { useEffect, useState } from 'react';
import {
  LoadData,
  RequestCategory,
} from '../../components/load-data/load-data';
import { ProductCard } from '../../components/main/product-card/product-card';
import { DefaultParam, RequestStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  fetchOrSetProductAction,
  fetchProductsAction,
} from '../../store/api-actions/api-actions';
import {
  getAllProducts,
  getCurrentProduct,
  getIsAllProductsLoad,
  getProductsError,
  getProductsRequestStatus,
} from '../../store/slices/products/products-selectors';
import { Products } from '../../types/product-type';
import { useSearchParams } from 'react-router-dom';
import { selectProducts } from '../../utils/utils';

export function CatalogCards() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getAllProducts);
  const currentProduct = useAppSelector(getCurrentProduct);
  const productsLoadStatus = useAppSelector(getProductsRequestStatus);
  const isProductsLoad = productsLoadStatus === RequestStatus.Loading;
  const isProductsLoaded = useAppSelector(getIsAllProductsLoad);
  const productsError = useAppSelector(getProductsError);

  const [searchParams] = useSearchParams();
  const currentPage =
    Number(searchParams.get('page')) || DefaultParam.PageNumberFirst;
  const [currentProducts, setCurrentProducts] = useState<Products>([]);

  useEffect(() => {
    if (!isProductsLoaded) {
      dispatch(fetchProductsAction());
    }
  }, [dispatch, isProductsLoaded]);

  useEffect(() => {
    const products = selectProducts(allProducts, currentPage);
    setCurrentProducts(products);
  }, [allProducts, currentPage]);

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
      {currentProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleProductCardButtonsClick}
        />
      ))}
    </div>
  );
}

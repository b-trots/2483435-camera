import { useAppSelector } from '../../hooks/hooks';
import { getCurrentProduct } from '../../store/slices/products/products-selectors';

export function ProductDescription() {
  const product = useAppSelector(getCurrentProduct);
  if (!product) {
    return;
  }
  return <div className="product__tabs-text">{product.description}</div>;
}

import { useAppSelector } from '../../../hooks/hooks';
import {
  getCurrentSimilarProducts,
  getSimilarProducts,
} from '../../../store/slices/products/products-selectors';
import { ProductCard } from '../../../components/main/product-card/product-card';
import { SliderButtons } from './slider-buttons/slider-buttons';
import { usePagination } from '../../../hooks/use-pagination';
import { ExplanationWord, NameSpace } from '../../../const/const';

export function Similar() {
  const similarProducts = useAppSelector(getSimilarProducts);
  const { currentPage } = usePagination(NameSpace.SimilarPageSearchId);

  const currentProducts = useAppSelector((state) =>
    getCurrentSimilarProducts(state, currentPage)
  );
  if (!similarProducts.length) {
    return null;
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">{ExplanationWord.SimilarProducts}</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {currentProducts.map((product) => (
                <ProductCard product={product} key={product.id} isActive />
              ))}
            </div>

            <SliderButtons />
          </div>
        </div>
      </section>
    </div>
  );
}

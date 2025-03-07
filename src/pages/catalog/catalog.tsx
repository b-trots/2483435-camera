import { useRef, useEffect } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Banner } from '../../components/main/banner';
import { Breadcrumbs } from '../../components/main/breadcrumbs/breadcrumbs';
import {
  useAppDispatch,
  useAppSelector,
  useScrollToTop,
} from '../../hooks/hooks';
import { fetchProductsAction } from '../../store/api-actions/api-actions';
import {
  getAllProducts,
  getIsAllProductsLoad,
} from '../../store/slices/products/products-selectors';
import { CatalogCards } from './catalog-cards';
import { useChangeTitle } from '../../hooks/use-change-title';
import { BooleanStatus, SHOP_TITLE, TitleName } from '../../const/const';
import { CallItem } from '../../components/main/modal/call-item/call-item';
import { Modal } from './modal';

export function Catalog() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getAllProducts);
  const productsLoadStatus = useAppSelector(getIsAllProductsLoad);
  const isProductsLoaded = productsLoadStatus === BooleanStatus.True;

  useChangeTitle(TitleName.Catalog);
  useScrollToTop();

  useEffect(() => {
    if (!isProductsLoaded) {
      dispatch(fetchProductsAction());
    }
  }, [dispatch, products, isProductsLoaded]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="wrapper" ref={containerRef}>
      <Header />
      <main>
        {isProductsLoaded && <Banner />}
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">{SHOP_TITLE}</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                  {/* <Filter /> */}
                </div>
                <div className="catalog__content">
                  {/* <Sorting/> */}
                  <CatalogCards />
                  {/* <PageSwitcher/> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Modal>
        <CallItem />
      </Modal>
      <Footer />
    </div>
  );
}

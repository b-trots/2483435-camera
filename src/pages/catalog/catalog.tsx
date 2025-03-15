import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Banner } from '../../components/main/banner/banner';
import { Breadcrumbs } from '../../components/main/breadcrumbs/breadcrumbs';
import { useScrollToTop } from '../../hooks/hooks';
import { CatalogCards } from './catalog-cards';
import { useChangeTitle } from '../../hooks/use-change-title';
import { SHOP_TITLE, TitleName } from '../../const/const';
import { CallItem } from '../../components/main/modal/call-item/call-item';
import { Modal } from '../../components/main/modal/modal';
import { Pagination } from './pagination/pagination';
export function Catalog() {
  useChangeTitle(TitleName.Catalog);
  useScrollToTop();

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
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
                  {<Pagination />}
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

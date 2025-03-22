import { SHOP_TITLE } from '../../const/const';
import { CatalogCards } from './catalog-cards';
import { Pagination } from './pagination/pagination';

export function CatalogContainer() {
  return (
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
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}

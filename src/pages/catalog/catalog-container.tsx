import { SHOP_TITLE } from '../../const/const';
import { CatalogCards } from './catalog-cards';
import { Pagination } from './pagination/pagination';
import { SortComponent } from './sorting/sorting';

export function CatalogContainer() {
  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">{SHOP_TITLE}</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <img src="img/banner.png" />
          </div>
          <div className="catalog__content">
            <SortComponent />
            <CatalogCards />
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}

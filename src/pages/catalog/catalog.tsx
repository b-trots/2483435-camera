import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Banner } from '../../components/main/banner/banner';
import { Breadcrumbs } from '../../components/main/breadcrumbs/breadcrumbs';
import { useScrollToTop } from '../../hooks/hooks';
import { useChangeTitle } from '../../hooks/use-change-title';
import { TitleName } from '../../const/const';
import { CatalogContainer } from './catalog-container';
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
          <CatalogContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Banner } from '../components/main/banner';
import { ProductCard } from '../components/main/product-card';
import mockProducts from '../mock/mock';
import { CallItem } from '../components/main/modal/catalog-call-item/catalog-call-item';
import { useRef, useState } from 'react';
import { useNoScroll } from '../hooks/use-no-scroll';
import { Breadcrumbs } from '../components/main/breadcrumbs/breadcrumbs';
import { useChangeTitle } from '../hooks/use-change-title';
import { TitleName } from '../const';

export function Catalog() {
  const [isCallItem, setIsCallItem] = useState<number | null>(null);

  const isActive = isCallItem !== null;

  const handleBuyButton = (id: number) =>
    setIsCallItem((prevState) => (prevState === id ? null : id));

  function handleModalClose() {
    setIsCallItem(null);
  }
  const containerRef = useRef<HTMLDivElement | null>(null);
  useNoScroll(containerRef, isActive);
  useChangeTitle(TitleName.Catalog);

  return (
    <div className="wrapper" ref={containerRef}>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                  {/* <Filter /> */}
                </div>
                <div className="catalog__content">
                  {/* <Sorting/> */}
                  <div className="cards catalog__cards">
                    {mockProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => handleBuyButton(product.id)}
                      />
                    ))}
                  </div>
                  {/* <PageSwitcher/> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {isCallItem && (
        <CallItem productId={isCallItem} onClose={handleModalClose} />
      )}
      <Footer />
    </div>
  );
}

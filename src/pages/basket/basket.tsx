import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { Breadcrumbs } from '@/components/main/breadcrumbs/breadcrumbs';
import { TitleName } from '@/const/const';
import { BasketList } from './basket-list';
import { Summary } from './summary/summary';

export function Basket() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">{TitleName.Basket}</h1>
              <BasketList />
              <Summary />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

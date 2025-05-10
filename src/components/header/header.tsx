import { BemClass, DefaultParam } from '@/const/const';
import { Logo } from './logo';
import { HeaderNav } from './header-nav';
import { memo } from 'react';
import { Search } from './search/search';
import { BasketIcon } from '../basket-icon';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const/const-navigate';
import { useAppSelector } from '@/hooks/hooks';
import { getTotalQuantity } from '@/store/slices/order/order-selectors';

function HeaderComponent() {
  const totalQuantity = useAppSelector(getTotalQuantity);

  return (
    <header className="header" id="header">
      <div className="container">
        <Logo bemBlock={BemClass.Header} />
        <HeaderNav />
        <Search />
        <Link className="header__basket-link" to={AppRoute.Card}>
          <BasketIcon />
          {totalQuantity !== DefaultParam.ZeroValue && (
            <span className="header__basket-count">{totalQuantity}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);

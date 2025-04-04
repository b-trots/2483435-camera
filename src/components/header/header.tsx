import { BemClass } from '../../const/const';
import { Logo } from './logo';
import { HeaderNav } from './header-nav';
import { memo } from 'react';
import { Search } from './search/search';

function HeaderComponent() {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo bemBlock={BemClass.Header} />
        <HeaderNav />
        <Search />
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);

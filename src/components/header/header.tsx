import { BemClass } from '../../const/const';
import { Logo } from './logo';
import { HeaderNav } from './header-nav';
import { memo } from 'react';

function HeaderComponent() {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo bemBlock={BemClass.Header} />
        <HeaderNav />
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);

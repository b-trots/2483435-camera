import { BemClass } from '../../const/const';
import { Logo } from './logo';
import { HeaderNav } from './header-nav';

export function Header() {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo bemBlock={BemClass.Header} />
        <HeaderNav />
        {/*<div class="form-search">
      <form>
        <label>
          <svg class="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlink:href="#icon-lens"></use>
          </svg>
          <input class="form-search__input" type="text" autocomplete="off" placeholder="Поиск по сайту">
        </label>
        <ul class="form-search__select-list">
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 8i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 7i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 6i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 5i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 4i</li>
        </ul>
      </form>
      <button class="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg><span class="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
    <a class="header__basket-link" href="#">
      <svg width="16" height="16" aria-hidden="true">
        <use xlink:href="#icon-basket"></use>
      </svg></a>*/}
      </div>
    </header>
  );
}

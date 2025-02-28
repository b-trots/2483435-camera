import { Link } from 'react-router-dom';
import { AppRoute, LogoParam } from '../../const';

export function Logo() {
  return (
    <Link
      className="header__logo"
      to={AppRoute.Main}
      aria-label={LogoParam.Name as string}
    >
      <svg width={LogoParam.Width} height={LogoParam.Height} aria-hidden="true">
        <use xlinkHref="#icon-logo" />
      </svg>
    </Link>
  );
}

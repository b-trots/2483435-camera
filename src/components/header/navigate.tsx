import { Link } from 'react-router-dom';
import { NAVIGATE } from '../../const';

export function Navigate() {
  return (
    <nav className="main-nav header__main-nav">
      <ul className="main-nav__list">
        {NAVIGATE.map(({ name, path }) => (
          <li className="main-nav__item" key={name}>
            <Link className="main-nav__link" to={path}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

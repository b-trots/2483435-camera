import { Link } from 'react-router-dom';
import { FOOTER_NAVIGATE } from '../../../const/const-navigate';

type FooterNavItemProps = {
  title: string;
  navigate: typeof FOOTER_NAVIGATE[number]['navigate'];
};

export function FooterNavItem({ title, navigate }: FooterNavItemProps) {
  return (
    <li className="footer__nav-item" key={title}>
      <p className="footer__title">{title}</p>
      <ul className="footer__list">
        {navigate.map(({ name, path }) => (
          <li className="footer__item" key={name}>
            <Link className="link" to={path}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

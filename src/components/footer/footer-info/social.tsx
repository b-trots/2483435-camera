import { Link } from 'react-router-dom';
import { SOCIAL } from '@/const/const-navigate';
import { ServiceParam } from '@/const/const';

export function Social() {
  return (
    <ul className="social">
      {SOCIAL.map(({ name, label, path }) => (
        <li className="social__item" key={name}>
          <Link className="link" to={path} aria-label={label}>
            <svg
              width={ServiceParam.SocialIconSize}
              height={ServiceParam.SocialIconSize}
              aria-hidden="true"
            >
              <use xlinkHref={`#icon-${name}`} />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}

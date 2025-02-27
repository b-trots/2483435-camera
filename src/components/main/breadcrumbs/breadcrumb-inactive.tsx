import { Link } from 'react-router-dom';

type BreadcrumbInactiveProps = {
  name: string;
  path: string;
};
export function BreadcrumbInactive({ name, path }: BreadcrumbInactiveProps) {
  return (
    <li className="breadcrumbs__item" key={name}>
      <Link className="breadcrumbs__link" to={path}>
        {name}
        <svg width={5} height={8} aria-hidden="true">
          <use xlinkHref="#icon-arrow-mini" />
        </svg>
      </Link>
    </li>
  );
}

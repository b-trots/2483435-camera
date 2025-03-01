import { Link } from 'react-router-dom';

type BreadcrumbProps = {
  name: string;
  path: string;
};
export function Breadcrumb({ name, path }: BreadcrumbProps) {
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

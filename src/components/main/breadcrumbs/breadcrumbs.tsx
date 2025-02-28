import { BREADCRUMBS } from '../../../const/const-navigate';
import { BreadcrumbActive } from './breadcrumb-active';
import { BreadcrumbInactive } from './breadcrumb-inactive';

type BreadcrumbsProps = {
  productName?: string;
};

export function Breadcrumbs({ productName }: BreadcrumbsProps) {
  let directories = BREADCRUMBS;
  if (productName) {
    directories = [...directories, { name: productName }];
  }
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {directories.map(({ name, path }, index) =>
            index !== directories.length - 1 && path ? (
              <BreadcrumbInactive name={name} key={name} path={path} />
            ) : (
              <BreadcrumbActive name={name} key={name} />
            )
          )}
        </ul>
      </div>
    </div>
  );
}

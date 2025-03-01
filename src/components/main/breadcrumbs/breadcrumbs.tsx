import { BREADCRUMBS } from '../../../const/const-navigate';
import { BreadcrumbActive } from './breadcrumb-active';
import { Breadcrumb } from './breadcrumb';

type BreadcrumbsProps = {
  productName?: string;
};

export function Breadcrumbs({ productName }: BreadcrumbsProps) {
  const correctDirectory = productName
    ? [...BREADCRUMBS, { name: productName }]
    : BREADCRUMBS;

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {correctDirectory.map(({ name, path }, index) =>
            index !== correctDirectory.length - 1 && path ? (
              <Breadcrumb name={name} key={name} path={path} />
            ) : (
              <BreadcrumbActive name={name} key={name} />
            )
          )}
        </ul>
      </div>
    </div>
  );
}

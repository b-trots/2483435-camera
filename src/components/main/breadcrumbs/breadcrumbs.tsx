import { AppRoute, BREADCRUMBS } from '@/const/const-navigate';
import { BreadcrumbActive } from './breadcrumb-active';
import { Breadcrumb } from './breadcrumb';
import { useLocation } from 'react-router-dom';
import { TitleName } from '@/const/const';

type BreadcrumbsProps = {
  cameraName?: string;
};

export function Breadcrumbs({ cameraName }: BreadcrumbsProps) {
  const currentPath = useLocation().pathname;
  const correctDirectory = () => {
    let directory = [...BREADCRUMBS];

    if (cameraName && currentPath !== AppRoute.Card) {
      directory = [...directory, { name: cameraName }];
    }

    if (currentPath === AppRoute.Card) {
      directory = [...directory, { name: TitleName.Basket }];
    }

    return directory;
  };

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {correctDirectory().map(({ name, path }, index) =>
            index !== correctDirectory().length - 1 && path ? (
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

type BreadcrumbActiveProps = {
  name: string;
};
export function BreadcrumbActive({ name }: BreadcrumbActiveProps) {
  return (
    <li className="breadcrumbs__item" key={name}>
      <span className="breadcrumbs__link breadcrumbs__link--active">
        {name}
      </span>
    </li>
  );
}

type ItemListProps = {
  title: string;
  value: string | number;
};
export function ItemList({ title, value }: ItemListProps) {
  return (
    <li className="item-list" key={title}>
      <span className="item-list__title">{title}:</span>
      <p className="item-list__text"> {value}</p>
    </li>
  );
}

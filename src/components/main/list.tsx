import { BemClass } from '../../const/const';
import { ItemList } from './item-list';

type ListProps = {
  bemClass: BemClass;
  listDetails: { title: string; value: string | number }[];
};

export function List({ bemClass, listDetails }: ListProps) {
  return (
    <ul className={`${bemClass}}__list`}>
      {listDetails.map(({ title, value }) => (
        <ItemList title={title} value={value} key={title} />
      ))}
    </ul>
  );
}

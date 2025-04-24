import { BemClass, SymbolParam } from '@/const/const';
import { ItemList } from './item-list';

type ListProps = {
  bemClass: BemClass;
  listDetails: { title: string; value: string | number }[];
};

export function List({ bemClass, listDetails }: ListProps) {
  const isReview =
    bemClass === BemClass.ReviewCard
      ? SymbolParam.DoubleUnderscore
      : SymbolParam.Dash;
  return (
    <ul className={`${bemClass}${isReview}list`}>
      {listDetails.map(({ title, value }) => (
        <ItemList title={title} value={value} key={title} />
      ))}
    </ul>
  );
}

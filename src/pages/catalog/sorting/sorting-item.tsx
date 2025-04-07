import classNames from 'classnames';
import {
  DefaultParam,
  NameSpace,
  ServiceParam,
  Sorting,
  SORTING,
} from '../../../const/const';
import { ButtonBemClass } from '../../../const/const-button';

type SortingItem = (typeof SORTING)[keyof typeof SORTING][number];
export type SortItemId = SortingItem['id'];

type SortingItemProps = {
  sortInfo: SortingItem;
  active: SortItemId;
  onChange: (id: SortItemId) => void;
};

export function SortingItem({ sortInfo, active, onChange }: SortingItemProps) {
  const { name, id, text } = sortInfo;
  const isType = name === Sorting.Sort;
  const isUp = id === Sorting.Up;
  const isActive = active === id;
  const itemClassName = classNames(
    isType ? ButtonBemClass.SortText : ButtonBemClass.Sort,
    !isType && isUp && ButtonBemClass.SortUp,
    !isType && !isUp && ButtonBemClass.SortDown
  );
  const isAriaLabel = !isType
    ? { [NameSpace.AriaLabel]: text }
    : DefaultParam.EmptyObject;

  return (
    <div className={itemClassName}>
      <input
        type="radio"
        id={id}
        name={name}
        {...isAriaLabel}
        checked={isActive}
        onChange={() => onChange(id)}
      />

      <label htmlFor={id}>
        {isType ? (
          text
        ) : (
          <svg
            width={ServiceParam.SortIconWidth}
            height={ServiceParam.SortIconHeight}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-sort" />
          </svg>
        )}
      </label>
    </div>
  );
}

import classNames from 'classnames';
import {
  BemClass,
  DefaultParam,
  NameSpace,
  ServiceParam,
} from '../../../../const/const';
import { ButtonBemClass } from '../../../../const/const-button';
import { SortOrder, Sorting } from '../../../../const/sorting-const';
import {
  SortingType,
  SortingValue,
} from '../../../../types/filter-and-sort-types';

type SortingItem = (typeof Sorting)[keyof typeof Sorting][number];

type SortingItemProps = {
  sortInfo: SortingItem;
  activeSorting: SortingType;
  onChange: (id: SortingValue) => void;
  disabled: boolean;
};

export function SortingItem({
  sortInfo,
  activeSorting,
  onChange,
  disabled,
}: SortingItemProps) {
  const { name, id, text } = sortInfo;
  const isType = name === BemClass.Sort;
  const isUp = id === SortOrder.Up;
  const isActive = Object.values(activeSorting).includes(id);
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
        tabIndex={ServiceParam.TabValueZero}
        type="radio"
        id={id}
        name={name}
        {...isAriaLabel}
        checked={isActive}
        onChange={() => onChange(id)}
        disabled={disabled}
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

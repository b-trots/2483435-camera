import { CameraCategoryId, CameraParam } from '../../../const/camera-const';
import { DefaultParam, NameSpace } from '../../../const/const';
import { FilterCameraType, FilterName } from '../../../const/filter-const';
import { useFilterAndSortingContext } from '../../../hooks/use-filters-and-sort/use-filter-and-sort-context';
import { usePriceFilter } from '../../../hooks/use-price-filter';
import {
  FilterItemType,
  FilterNameRus,
} from '../../../types/filter-and-sort-types';
import { isFilterChecked } from '../../../utils/filter-and-sorting-utils/filter-utils/is-filter-checked';

type FilterItemProps = {
  title: FilterNameRus;
  param: FilterItemType['params'][number];
};

export function FilterItem({ title, param }: FilterItemProps) {
  const [, value] = param;
  const { filters } = useFilterAndSortingContext();
  const isPrice = title === CameraParam.Price;
  const isRadio = title === CameraParam.Category;
  const itemType = isRadio ? NameSpace.Radio : NameSpace.Checkbox;
  const priceProps = usePriceFilter({ param });
  const isChecked = isFilterChecked(filters, title, value.id);
  const itemName = isRadio ? FilterName.Category.id : value.id;

  const defaultValue = isRadio
    ? { [NameSpace.AriaLabel]: value.id }
    : DefaultParam.EmptyObject;

  const isDisabled =
    (value.id === FilterCameraType.Film.id ||
      value.id === FilterCameraType.Snapshot.id) &&
    filters.category === CameraCategoryId.VideoCamera;

  return isPrice ? (
    <div className="custom-input">
      <label>
        <input {...priceProps} />
      </label>
    </div>
  ) : (
    <div className={`custom-${itemType} catalog-filter__item`}>
      <label>
        <input
          tabIndex={0}
          type={itemType}
          name={itemName}
          {...defaultValue}
          disabled={isDisabled}
          checked={isChecked}
          readOnly
        />
        <span className={`custom-${itemType}__icon`} />
        <span className={`custom-${itemType}__label`}>{value.name}</span>
      </label>
    </div>
  );
}

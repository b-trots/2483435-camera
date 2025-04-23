import { useRef } from 'react';
import { Button } from '../../../../components/main/buttons/button';
import { ExplanationWord } from '../../../../const/const';
import {
  ButtonBemClass,
  ButtonName,
  ButtonType,
} from '../../../../const/const-button';
import { Filter, FilterCameraPrice } from '../../../../const/filter-const';
import { FilterBlock } from './filter-block';
import { handleFormKeyDown } from '../../../../utils/filter-and-sorting-utils/handle-form-key-down';
import { useFilterAndSortContext } from '../../../../hooks/use-filter-and-sort-context/use-filter-and-sort-context';

export function FilterComponent() {
  const { updateFilters, resetFilters } = useFilterAndSortContext();
  const formRef = useRef<HTMLFormElement | null>(null);

  const isPriceFilter = (name: string) =>
    name === FilterCameraPrice.Price.id ||
    name === FilterCameraPrice.PriceUp.id;

  const handleFilterParamChange = (e: React.FormEvent<HTMLFormElement>) => {
    const currentFilter = e.target as HTMLInputElement;

    if (!isPriceFilter(currentFilter.name)) {
      updateFilters(e);
    }
  };

  const handleResetFiltersClick = () => {
    resetFilters();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    handleFormKeyDown(e, formRef);
  };

  return (
    <div className="catalog-filter">
      <form
        ref={formRef}
        action="#"
        onChange={handleFilterParamChange}
        onKeyDown={handleKeyDown}
      >
        <h2 className="visually-hidden">{ExplanationWord.Filter}</h2>
        {Filter.map((filter) => (
          <FilterBlock filter={filter} key={filter.title} />
        ))}
        <Button
          type={ButtonType.Reset}
          bemClass={ButtonBemClass.SortReset}
          text={ButtonName.SortReset}
          onClick={handleResetFiltersClick}
        />
      </form>
    </div>
  );
}

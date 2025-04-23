import { SortingItem } from './sorting-item';
import { ExplanationWord, ServiceParam } from '../../../../const/const';
import { Sorting } from '../../../../const/sorting-const';
import { SortingValue } from '../../../../types/filter-and-sort-types';
import { useRef } from 'react';
import { handleFormKeyDown } from '../../../../utils/filter-and-sorting-utils/handle-form-key-down';
import { useFilterAndSortContext } from '../../../../hooks/use-filters-and-sort/use-filter-and-sort-context';

export function SortingComponent() {
  const { filteredCameras, sorting, updateSorting } =
  useFilterAndSortContext();
  const isMinCountCameras =
    filteredCameras.length < ServiceParam.MinimalCountCameras;
  const handleSortChange = (id: SortingValue) => {
    updateSorting(id);
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    handleFormKeyDown(e, formRef);
  };
  return (
    <div className="catalog-sort">
      <form action="#" ref={formRef} onKeyDown={handleKeyDown}>
        <div className="catalog-sort__inner">
          <p className="title title--h5">{ExplanationWord.ToSort}</p>
          {Object.entries(Sorting).map(([key, value]) => (
            <div className={`catalog-sort__${key}`} key={key}>
              {value.map((sortInfo) => (
                <SortingItem
                  sortInfo={sortInfo}
                  key={sortInfo.id}
                  activeSorting={sorting}
                  onChange={handleSortChange}
                  disabled={isMinCountCameras}
                />
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

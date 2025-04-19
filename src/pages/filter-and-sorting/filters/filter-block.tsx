import { CameraParam } from '../../../const/camera-const';
import {
  DefaultParam,
  ExplanationWord,
  ServiceParam,
} from '../../../const/const';
import { FilterItemType } from '../../../types/filter-and-sort-types';
import { FilterItem } from './filter-item';

type FilterBlockParam = {
  filter: FilterItemType;
};

export function FilterBlock({ filter }: FilterBlockParam) {
  const { title, params } = filter;
  const isPrice = title === CameraParam.Price;
  const isPriceSymbol = isPrice
    ? ExplanationWord.Price
    : DefaultParam.EmptyString;

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">
        {title}
        {isPriceSymbol}
      </legend>

      {isPrice ? (
        <div className="catalog-filter__price-range">
          {params.map((param) => (
            <FilterItem
              title={title}
              param={param}
              key={param[ServiceParam.FirstElement]}
            />
          ))}
        </div>
      ) : (
        params.map((param) => (
          <FilterItem
            title={title}
            param={param}
            key={param[ServiceParam.FirstElement]}
          />
        ))
      )}
    </fieldset>
  );
}

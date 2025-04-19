import { BemClass } from './const';

enum SortParam {
  Type = 'type',
  Order = 'order',
}

enum SortType {
  SortPrice = 'sortPrice',
  SortPopular = 'sortPopular',
}

enum SortOrder {
  Up = 'up',
  Down = 'down',
}

const Sorting = {
  [SortParam.Type]: [
    { name: BemClass.Sort, id: SortType.SortPrice, text: 'по цене' },
    {
      name: BemClass.Sort,
      id: SortType.SortPopular,
      text: 'по популярности',
    },
  ],
  [SortParam.Order]: [
    {
      name: BemClass.SortIcon,
      id: SortOrder.Up,
      text: 'По возрастанию',
    },
    {
      name: BemClass.SortIcon,
      id: SortOrder.Down,
      text: 'По убыванию',
    },
  ],
} as const;

export { SortParam, SortType, SortOrder, Sorting };

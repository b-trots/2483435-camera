import { SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';

export type ActiveState = Pick<State, SliceName.Active>;

const getSortType = (state: ActiveState) => state[SliceName.Active].sortType;
const getSortDirection = (state: ActiveState) =>
  state[SliceName.Active].sortDirection;

export { getSortType, getSortDirection };

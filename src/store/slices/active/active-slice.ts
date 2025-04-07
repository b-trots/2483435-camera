import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveSlice } from '../../../types/store-types/slices-types';
import { SliceName, Sorting } from '../../../const/const';
import { SortingDirection, SortingType } from '../../../types/types';

const activeState: ActiveSlice = {
  sortType: Sorting.SortPrice,
  sortDirection: Sorting.Up,
};

const activeSLice = createSlice({
  name: SliceName.Active,
  initialState: activeState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortingType>) => {
      state.sortType = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortingDirection>) => {
      state.sortDirection = action.payload;
    },
    resetSortParams: (state) => {
      state.sortType = Sorting.SortPrice;
      state.sortDirection = Sorting.Up;
    },
  },
});

const { setSortType, setSortDirection, resetSortParams } = activeSLice.actions;

export { activeSLice, setSortType, setSortDirection, resetSortParams };

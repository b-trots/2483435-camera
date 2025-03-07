import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BooleanStatus, RequestStatus, SliceName } from '../../../const/const';
import { ProductsSlice } from '../../../types/store-types/slices-types';
import {
  fetchOrSetProductAction,
  fetchProductsAction,
} from '../../api-actions/api-actions';
import { FullProduct } from '../../../types/product-type';

const ProductsState: ProductsSlice = {
  allProducts: {},
  currentProduct: null,
  isAllProductsLoaded: BooleanStatus.False,
  requestStatus: RequestStatus.Idle,
};

const productsSlice = createSlice({
  name: SliceName.Products,
  initialState: ProductsState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<FullProduct>) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        const products = action.payload;
        if (products) {
          products.forEach((product) => {
            state.allProducts[product.id] = product;
          });
        }
        state.isAllProductsLoaded = BooleanStatus.True;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOrSetProductAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOrSetProductAction.fulfilled, (state, action) => {
        const product = action.payload;
        if (product) {
          state.allProducts[product.id] = product;
          state.currentProduct = product;
        }
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOrSetProductAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
});
const { setCurrentProduct } = productsSlice.actions;

export { productsSlice, setCurrentProduct };

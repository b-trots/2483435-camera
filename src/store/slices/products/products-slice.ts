import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '../../../const/const';
import { ProductsSlice } from '../../../types/store-types/slices-types';
import {
  fetchOrSetProductAction,
  fetchProductsAction,
  fetchPromoAction,
} from '../../api-actions/api-actions';
import { FullProduct } from '../../../types/product-type';

const productsState: ProductsSlice = {
  allProducts: {},
  promoProducts: [],
  currentProduct: null,
  isAllProductsLoaded: false,
  isPromoProductLoaded: false,
  requestStatus: RequestStatus.Idle,
  productsError: false,
};

const productsSlice = createSlice({
  name: SliceName.Products,
  initialState: productsState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<FullProduct>) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.productsError = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        const products = action.payload;
        if (products) {
          state.allProducts = products;
        }
        state.isAllProductsLoaded = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.productsError = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.isPromoProductLoaded = true;
        state.promoProducts = action.payload;
      })

      .addCase(fetchOrSetProductAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.productsError = false;
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
        state.productsError = true;
      });
  },
});
const { setCurrentProduct } = productsSlice.actions;

export { productsSlice, setCurrentProduct };

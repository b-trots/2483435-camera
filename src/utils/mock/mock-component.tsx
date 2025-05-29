import { createAPI } from '@/services/api';
import { State } from '@/types/store-types/store-types';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action, DeepPartial } from 'redux';
import { Provider } from 'react-redux';
import { AppThunkDispatch } from './mock';
import { BrowserRouter } from 'react-router-dom';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withBrowserRouter(component: JSX.Element) {
  return <BrowserRouter>{component}</BrowserRouter>;
}

export function withStore(
  component: JSX.Element,
  initialState: DeepPartial<State> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

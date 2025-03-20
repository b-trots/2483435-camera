import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import { App } from './components/app';
import React from 'react';
import { ToastParam } from './const/const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer containerId={ToastParam.Main} />
      <App />
    </Provider>
  </React.StrictMode>
);

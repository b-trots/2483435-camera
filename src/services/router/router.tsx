import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { AppRoute } from '../../const';

import { Error } from '../../components//main/error/error';
import { Catalog } from '../../pages/catalog';
import { Product } from '../../pages/product/product';
import { AppRoute } from '../../const/const-navigate';

function Router() {
  const router = createBrowserRouter([
    {
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Catalog />,
        },
        {
          path: AppRoute.Cameras,
          element: <Product />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export { Router };

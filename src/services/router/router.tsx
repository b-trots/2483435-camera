import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Error } from '../../components//main/error/error';
import { Product } from '../../pages/product/product';
import { AppRoute } from '../../const/const-navigate';
import { Catalog } from '../../pages/catalog/catalog';

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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { AppRoute } from '../../const';

import { Error } from '../../components//main/error/error';
import { Catalog } from '../../pages/catalog';
import { AppRoute } from '../../const';
import { Product } from '../../pages/product/product';

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
          element: <Product/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export { Router };

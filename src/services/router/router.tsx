import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { Product } from '@/pages/product/product';
import { AppRoute } from '@/const/const-navigate';
import { Catalog } from '@/pages/catalog/catalog';
import { Page404 } from '@/components/page-404/page-404.tsx';

function Router() {
  const router = createBrowserRouter([
    {
      errorElement: <Page404 />,
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

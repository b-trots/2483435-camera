import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Product } from '@/pages/product/product';
import { AppRoute } from '@/const/const-navigate';
import { Catalog } from '@/pages/catalog/catalog';
import { Page404 } from '@/components/page-404/page-404.tsx';
import { Basket } from '@/pages/basket/basket';
import { Modal } from '@/components/modal/modal';

function Layout() {
  return (
    <>
      <Outlet />
      <Modal />
    </>
  );
}

function Router() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
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
        {
          path: AppRoute.Card,
          element: <Basket />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export { Router };

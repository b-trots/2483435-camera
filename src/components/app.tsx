import { useEffect } from 'react';
import { Router } from '@/services/router/router';
import { useAppDispatch } from '@/hooks/hooks';
import { fetchCamerasAction } from '@/store/slices/cameras/cameras-actions';
import { Modal } from './modal/modal';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  return (
    <>
      <Router />
      <Modal />
    </>
  );
}

export { App };

import { useEffect } from 'react';
import { Router } from '@/services/router/router';
import { useAppDispatch } from '@/hooks/hooks';
import { fetchCamerasAction } from '@/store/slices/cameras/cameras-actions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  return <Router />;
}

export { App };

import { useEffect } from 'react';
import { Router } from '@/services/router/router';
import { useAppDispatch } from '@/hooks/hooks';
import { fetchCamerasAction, fetchPromoAction } from '@/store/slices/cameras/cameras-actions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  return <Router />;
}

export { App };

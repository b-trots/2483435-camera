import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '@/types/store-types/store-types';
import { useEffect } from 'react';
import { DefaultParam } from '@/const/const';
import {
  fetchOrSetCameraAction,
  fetchSimilarAction,
} from '@/store/slices/cameras/cameras-actions';
import { FullCamera } from '@/types/camera-type';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(DefaultParam.ScrollZero, DefaultParam.ScrollZero);
  }, []);
};

function useFetchCameraData(id: string, currentCamera: FullCamera | null) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentCamera?.id !== Number(id)) {
      dispatch(fetchOrSetCameraAction(Number(id)));
      dispatch(fetchSimilarAction(Number(id)));
    }
  }, [id, currentCamera, dispatch]);
}

export { useAppDispatch, useAppSelector, useScrollToTop, useFetchCameraData };

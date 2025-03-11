import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../types/store-types/store-types';
import { useEffect } from 'react';
import { DefaultParam } from '../const/const';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(DefaultParam.ScrollZero, DefaultParam.ScrollZero);
  }, []);
};

export { useAppDispatch, useAppSelector, useScrollToTop };

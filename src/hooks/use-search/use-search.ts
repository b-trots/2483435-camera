import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const/const-navigate';
import { getAllCameras } from '@/store/slices/cameras/cameras-selectors';
import { setCurrentCameraId } from '@/store/slices/cameras/cameras-slice';
import { FullCamera } from '@/types/camera-type';
import { handleSearchKeyDown } from '@/utils/search-utils/handle-search-key-down';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useSearchCameras } from './use-search-cameras';
import { DefaultParam, ServiceParam } from '@/const/const';

export function useSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const allCameras = useAppSelector(getAllCameras);
  const [search, setSearch] = useState(DefaultParam.EmptyString);
  const [filteredCameras, setFilteredCameras] = useState<FullCamera[]>(
    []
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isSearchValid = search.length >= ServiceParam.MinimalSearchCharacters;

  useSearchCameras(
    allCameras,
    search,
    filteredCameras,
    setFilteredCameras,
    setActiveIndex
  );

  useEffect(() => {
    setSearch(DefaultParam.EmptyString);
    setFilteredCameras([]);
    setActiveIndex(null);
    setIsInputFocused(false);
  }, [location.pathname]);

  const handleSearchChange = (value: string) => setSearch(value);

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (isSearchValid) {
      setActiveIndex(DefaultParam.ZeroIndex);
    }
  };

  const removeInputFocus = () => {
    inputRef.current?.blur();
    setIsInputFocused(false);
    setActiveIndex(null);
  };

  const handleSelect = (id: number) => {
    dispatch(setCurrentCameraId(id));
    navigate(AppRoute.Cameras.replace(':id', String(id)));
    removeInputFocus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleSearchKeyDown({
      e,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick: handleSelect,
    });
  };

  const clearSearch = () => {
    setSearch(DefaultParam.EmptyString);
    setFilteredCameras([]);
    setActiveIndex(null);
  };

  return {
    inputRef,
    search,
    isSearchValid,
    filteredCameras,
    activeIndex,
    setActiveIndex,
    isInputFocused,
    handleSearchChange,
    handleInputFocus,
    handleKeyDown,
    handleSelect,
    clearSearch,
  };
}

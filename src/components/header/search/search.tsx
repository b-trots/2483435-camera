import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import {
  DefaultParam,
  ServiceParam,
  ExplanationWord,
  BemClass,
} from '../../../const/const';
import { ButtonBemClass, ButtonType } from '../../../const/const-button';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getAllCameras } from '../../../store/slices/cameras/cameras-selectors';
import { FullCamera } from '../../../types/product-type';
import { CloseButton } from '../../main/buttons/close-button';
import { useSearchCameras } from '../../../hooks/use-search-cameras';
import { SearchList } from './search-list';
import { AppRoute } from '../../../const/const-navigate';
import { useLocation, useNavigate } from 'react-router';
import { handleSearchKeyDown } from '../../../utils/search-utils/handle-search-key-down';
import { setCurrentCameraId } from '../../../store/slices/cameras/cameras-slice';

export function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const allCameras = Object.values(useAppSelector(getAllCameras));
  const [search, setSearch] = useState(DefaultParam.EmptyString);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filteredCameras, setFilteredCameras] = useState<FullCamera[]>(
    DefaultParam.EmptyArray
  );

  const isSearchValid = search.length >= ServiceParam.MinSearchCharacters;
  const isSearchVoid = inputRef.current
    ? inputRef.current.value.length > DefaultParam.ZeroValue
    : null;

  const searchClassName = classNames(
    BemClass.FormSearch,
    isSearchValid && BemClass.ListOpened
  );

  useSearchCameras(
    allCameras,
    search,
    filteredCameras,
    setFilteredCameras,
    setActiveIndex
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleInputFocus = () => {
    if (isSearchValid) {
      if (activeIndex === null || activeIndex === filteredCameras.length) {
        setActiveIndex(filteredCameras.length - 1);
      } else {
        setActiveIndex(DefaultParam.ZeroValue);
      }
    }
  };

  const handleClearButtonClick = () => {
    setSearch(DefaultParam.EmptyString);
    setFilteredCameras(DefaultParam.EmptyArray);
    setActiveIndex(DefaultParam.ZeroValue);
  };

  useEffect(() => {
    inputRef.current?.blur();
    handleClearButtonClick();
  }, [location.pathname]);

  const handleClick = (id: number) => {
    inputRef.current?.blur();
    handleClearButtonClick();
    dispatch(setCurrentCameraId(id));
    navigate(AppRoute.Cameras.replace(':id', String(id)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleSearchKeyDown({
      e,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick,
    });
  };

  return (
    <div className={searchClassName}>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={ServiceParam.SearchIconSize}
            height={ServiceParam.SearchIconSize}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            ref={inputRef}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder={ExplanationWord.SearchTheSite}
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
          />
        </label>
        {isSearchValid && filteredCameras.length > DefaultParam.ZeroValue && (
          <SearchList
            filteredCameras={filteredCameras}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onClick={handleClick}
          />
        )}
      </form>

      {isSearchVoid && (
        <CloseButton
          bemClass={ButtonBemClass.FormSearchReset}
          type={ButtonType.Reset}
          onClick={handleClearButtonClick}
        />
      )}
    </div>
  );
}

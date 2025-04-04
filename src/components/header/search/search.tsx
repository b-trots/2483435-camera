import classNames from 'classnames';
import { useState } from 'react';
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
import { useNavigate } from 'react-router';
import { handleSearchKeyDown } from '../../../utils/search-utils/handle-search-key-down';
import { setCurrentCameraId } from '../../../store/slices/cameras/cameras-slice';

export function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allCameras = Object.values(useAppSelector(getAllCameras));
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filteredCameras, setFilteredCameras] = useState<FullCamera[]>(
    DefaultParam.EmptyArray
  );

  const isSearchValid = search.length >= ServiceParam.MinSearchCharacters;

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

  const handleClick = (id: number) => {
    setSearch(DefaultParam.EmptyString);
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

  const handleInputFocus = () => {
    if (activeIndex === null && isSearchValid) {
      setActiveIndex(DefaultParam.ZeroValue);
    }
    if (activeIndex === filteredCameras.length && isSearchValid) {
      setActiveIndex(filteredCameras.length - 1);
    }
  };

  const handleClearButtonClick = () => {
    setSearch(DefaultParam.EmptyString);
    setFilteredCameras(DefaultParam.EmptyArray);
    setActiveIndex(DefaultParam.ZeroValue);
  };

  return (
    <>
      <div>{activeIndex}</div>
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
          {isSearchValid && (
            <SearchList
              filteredCameras={filteredCameras}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onClick={handleClick}
            />
          )}
        </form>

        {isSearchValid && (
          <CloseButton
            bemClass={ButtonBemClass.FormSearchReset}
            type={ButtonType.Reset}
            onClick={handleClearButtonClick}
          />
        )}
      </div>
    </>
  );
}

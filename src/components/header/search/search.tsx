import {
  DefaultParam,
  ServiceParam,
  ExplanationWord,
  BemClass,
} from '../../../const/const';
import { ButtonBemClass, ButtonType } from '../../../const/const-button';
import { CloseButton } from '../../main/buttons/close-button';
import { SearchList } from './search-list';
import { useSearch } from '../../../hooks/use-search/use-search';
import classNames from 'classnames';

export function Search() {
  const {
    inputRef,
    search,
    isSearchValid,
    filteredCameras,
    activeIndex,
    setActiveIndex,
    isInputFocused,
    handleSearchChange,
    handleInputFocus,
    handleInputBlur,
    handleKeyDown,
    handleSelect,
    clearSearch,
  } = useSearch();

  const searchClassName = classNames(BemClass.FormSearch, {
    [BemClass.ListOpened]: isInputFocused && isSearchValid,
  });

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
              ref={inputRef}
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder={ExplanationWord.SearchTheSite}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            />
          </label>
          {isSearchValid && filteredCameras.length > DefaultParam.ZeroValue && (
            <SearchList
              filteredCameras={filteredCameras}
              activeIndex={activeIndex}
              setActiveIndex={(index) => setActiveIndex(index)}
              onClick={handleSelect}
            />
          )}
        </form>

        {search && (
          <CloseButton
            bemClass={ButtonBemClass.FormSearchReset}
            type={ButtonType.Reset}
            onClick={clearSearch}
          />
        )}
      </div>
    </>
  );
}

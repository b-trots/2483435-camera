import { useEffect } from 'react';
import { DefaultParam, ServiceParam } from '../const/const';
import { filterCameras } from '../utils/search-utils/search-utils';
import { FullCamera } from '../types/product-type';

export function useSearchCameras(
  allCameras: FullCamera[],
  query: string,
  filteredCameras: FullCamera[],
  setFilteredCameras: React.Dispatch<React.SetStateAction<FullCamera[]>>,
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
) {
  useEffect(() => {
    if (query.length < ServiceParam.MinSearchCharacters) {
      if (filteredCameras.length > DefaultParam.ZeroValue) {
        setFilteredCameras(DefaultParam.EmptyArray);
      }
      return;
    }

    const newFiltered = filterCameras(query, allCameras);

    if (JSON.stringify(newFiltered) !== JSON.stringify(filteredCameras)) {
      setFilteredCameras(newFiltered);
      setActiveIndex(DefaultParam.ZeroValue);
    }
  });
}

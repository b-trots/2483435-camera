import { useEffect } from 'react';
import { ServiceParam, DefaultParam } from '../../const/const';
import { FullCamera } from '../../types/camera-type';
import { filterCameras } from '../../utils/search-utils/search-utils';

export function useSearchCameras(
  allCameras: FullCamera[],
  query: string,
  filteredCameras: FullCamera[],
  setFilteredCameras: React.Dispatch<React.SetStateAction<FullCamera[]>>,
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
) {
  useEffect(() => {
    if (query.length < ServiceParam.MinimalSearchCharacters) {
      if (filteredCameras.length > DefaultParam.ZeroValue) {
        setFilteredCameras(DefaultParam.EmptyArray);
      }
      return;
    }

    const newFiltered = filterCameras(query, allCameras);

    if (
      newFiltered.length !== filteredCameras.length ||
      !newFiltered.every(
        (camera, index) => camera.id === filteredCameras[index]?.id
      )
    ) {
      setFilteredCameras(newFiltered);
      setActiveIndex(DefaultParam.ZeroValue);
    }
  }, [query, allCameras, filteredCameras, setFilteredCameras, setActiveIndex]);
}

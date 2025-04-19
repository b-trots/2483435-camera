import { FullCamera } from '../../../types/camera-type';
import { SearchListItem } from './search-list-item';
import { DefaultParam, ServiceParam } from '../../../const/const';
import { useScrollToActiveItem } from '../../../hooks/use-search/use-scroll-to-active-item';

type SearchListProps = {
  filteredCameras: FullCamera[];
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onClick: (cameraId: number) => void;
};

export function SearchList({
  filteredCameras,
  activeIndex,
  setActiveIndex,
  onClick,
}: SearchListProps) {
  useScrollToActiveItem(activeIndex);

  if (!filteredCameras || filteredCameras.length === DefaultParam.ZeroValue) {
    return null;
  }

  const handleListMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ul className="form-search__select-list" tabIndex={ServiceParam.TabValueInActive}>
      {filteredCameras
        .filter(
          (camera): camera is FullCamera =>
            camera !== null && camera !== undefined
        )
        .map((camera, index) => (
          <SearchListItem
            key={camera.id}
            camera={camera}
            index={index}
            activeIndex={activeIndex}
            onClick={onClick}
            onHover={setActiveIndex}
            onLeave={handleListMouseLeave}
          />
        ))}
    </ul>
  );
}

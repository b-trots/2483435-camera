import { FullCamera } from '../../../types/product-type';
import { SearchListItem } from './search-list-item';
import { useRef } from 'react';
import { useScrollToActiveItem } from '../../../hooks/use-scroll-to-active-item';
import { DefaultParam } from '../../../const/const';

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
  const itemRefs = useRef<(HTMLLIElement | null)[]>(DefaultParam.EmptyArray);

  useScrollToActiveItem(itemRefs, activeIndex);

  if (!filteredCameras || filteredCameras.length === DefaultParam.ZeroValue) {
    return null;
  }

  const handleListMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ul className="form-search__select-list" tabIndex={-1}>
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
            itemRef={(el) => (itemRefs.current[index] = el)}
          />
        ))}
    </ul>
  );
}

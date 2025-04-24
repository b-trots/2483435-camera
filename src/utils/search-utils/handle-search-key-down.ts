import {
  DefaultParam,
  KeyboardButtonName,
  ServiceParam,
} from '@/const/const';
import { FullCamera } from '@/types/camera-type';

type HandleSearchKeyDownProps = {
  e: React.KeyboardEvent<HTMLInputElement>;
  filteredCameras: FullCamera[];
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleClick: (cameraId: number) => void;
};

export const handleSearchKeyDown = ({
  e,
  filteredCameras,
  activeIndex,
  setActiveIndex,
  handleClick,
}: HandleSearchKeyDownProps) => {
  const maxIndex = filteredCameras.length - ServiceParam.IndexStep;

  const IndexStep = {
    Increase: ServiceParam.IndexStep,
    Decrease: -ServiceParam.IndexStep,
  } as const;
  if (!filteredCameras.length || activeIndex === null) {
    return;
  }

  const getNextIndex = (delta: number) =>
    (activeIndex + delta + filteredCameras.length) % filteredCameras.length;

  switch (e.key) {
    case KeyboardButtonName.ArrowDown:
      e.preventDefault();
      setActiveIndex(getNextIndex(IndexStep.Increase));
      break;

    case KeyboardButtonName.ArrowUp:
      e.preventDefault();
      setActiveIndex(getNextIndex(IndexStep.Decrease));
      break;

    case KeyboardButtonName.Tab:
      if (e.shiftKey && activeIndex === DefaultParam.ZeroIndex) {
        setActiveIndex(null);
        return;
      }
      if (!e.shiftKey && activeIndex === maxIndex) {
        setActiveIndex(filteredCameras.length);
        return;
      }
      e.preventDefault();
      setActiveIndex(
        getNextIndex(e.shiftKey ? IndexStep.Decrease : IndexStep.Increase)
      );
      break;

    case KeyboardButtonName.Enter:
      e.preventDefault();
      handleClick(filteredCameras[activeIndex].id);
      break;

    default:
      break;
  }
};

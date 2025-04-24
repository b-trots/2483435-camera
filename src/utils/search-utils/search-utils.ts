import { FullCamera } from '@/types/camera-type';

const filterCameras = (query: string, cameras: FullCamera[]) =>
  cameras.filter(
    (camera) =>
      camera !== null && camera.name.toLowerCase().includes(query.toLowerCase())
  );

export { filterCameras };

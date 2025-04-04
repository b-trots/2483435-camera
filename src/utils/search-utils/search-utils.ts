import { FullCamera } from '../../types/product-type';

const filterCameras = (query: string, cameras: FullCamera[]) =>
  cameras.filter((camera) =>
    camera.name.toLowerCase().includes(query.toLowerCase())
  );

export { filterCameras };

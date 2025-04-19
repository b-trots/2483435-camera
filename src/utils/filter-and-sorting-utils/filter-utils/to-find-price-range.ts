import { DefaultParam, ServiceParam } from '../../../const/const';
import { Cameras } from '../../../types/camera-type';
import { FilterCameraPriceType } from '../../../types/filter-and-sort-types';

const toFindPriceRange = (cameras: Cameras): FilterCameraPriceType => {
  if (!cameras.length) {
    return { price: DefaultParam.ZeroValue, priceUp: DefaultParam.ZeroValue };
  }

  return cameras.reduce(
    (range, camera) => ({
      price: Math.min(range.price, camera.price),
      priceUp: Math.max(range.priceUp, camera.price),
    }),
    {
      price: cameras[ServiceParam.FirstElement].price,
      priceUp: cameras[ServiceParam.FirstElement].price,
    }
  );
};

export { toFindPriceRange };

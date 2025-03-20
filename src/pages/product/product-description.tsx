import { useAppSelector } from '../../hooks/hooks';
import { getCurrentCamera } from '../../store/slices/cameras/cameras-selectors';

export function ProductDescription() {
  const camera = useAppSelector(getCurrentCamera);
  if (!camera) {
    return;
  }
  return <div className="product__tabs-text">{camera.description}</div>;
}

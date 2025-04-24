import { useEffect } from 'react';
import { ServiceParam } from '@/const/const';

export function useScrollToActiveItem(activeIndex: number | null) {
  useEffect(() => {
    if (activeIndex !== null) {
      const item = document.getElementById(`camera-${activeIndex}`);
      item?.scrollIntoView({
        behavior: ServiceParam.ScrollBehaviorSmooth,
        block: ServiceParam.ScrollBlockNearest,
      });
    }
  }, [activeIndex]);
}

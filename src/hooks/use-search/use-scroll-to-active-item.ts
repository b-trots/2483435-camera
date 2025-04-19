import { useEffect } from 'react';

export function useScrollToActiveItem(activeIndex: number | null) {
  useEffect(() => {
    if (activeIndex !== null) {
      const item = document.getElementById(`camera-${activeIndex}`);
      item?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeIndex]);
}

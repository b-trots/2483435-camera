import { useEffect } from 'react';

export function useScrollToActiveItem<T extends HTMLElement>(
  refs: React.MutableRefObject<(T | null)[]>,
  activeIndex: number | null
) {
  useEffect(() => {
    if (activeIndex !== null && refs.current[activeIndex]) {
      refs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeIndex, refs]);
}

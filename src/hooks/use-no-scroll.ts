import { useEffect } from 'react';

const useNoScroll = (
  containerRef: React.RefObject<HTMLDivElement>,
  isActive: boolean
) => {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      if (isActive) {
        e.preventDefault();
      }
    };

    if (isActive) {
      container.addEventListener('wheel', handleWheel);
    } else {
      container.removeEventListener('wheel', handleWheel);
    }

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [containerRef, isActive]);
};

export { useNoScroll };

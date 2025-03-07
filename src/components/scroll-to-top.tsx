import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children as React.ReactElement;
}
export { ScrollToTop };

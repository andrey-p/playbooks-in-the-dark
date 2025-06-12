import { useState, useEffect, useCallback } from 'react';

export default function useMobileLayout() {
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  const onResizeEvent = useCallback(() => {
    setIsMobileLayout(window.matchMedia('(max-width: 600px)').matches);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResizeEvent);

    onResizeEvent();

    return () => {
      window.removeEventListener('resize', onResizeEvent);
    };
  }, [onResizeEvent]);

  return isMobileLayout;
}

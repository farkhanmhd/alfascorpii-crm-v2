import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { isMobileAtom } from '@/store';

const useMobile = () => {
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
  }, [window]);

  return { isMobile, setIsMobile };
};

export default useMobile;

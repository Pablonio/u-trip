import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PantallaCelular from './PantallaCelular';
import PantallaTablet from './PantallaTablet';
import PantallaDesktop from './PantallaDesktop';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      {isMobile && <PantallaCelular />}
      {isTablet && <PantallaTablet />}
      {isDesktop && <PantallaDesktop />}
    </div>
  );
}

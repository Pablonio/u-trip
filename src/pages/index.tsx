import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '../context/ThemeContext';
import PantallaCelular from './Paginas/PantallaCelular';
import PantallaTablet from './Paginas/PantallaTablet';
import PantallaDesktop from './Paginas/PantallaDesktop';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  if (!mounted) {
    return null;
  }

  return (
    <main className={`w-full h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-black text-black dark:text-white">
        {isMobile && <PantallaCelular />}
        {isTablet && <PantallaTablet />}
        {isDesktop && <PantallaDesktop />}
      </div>
    </main>
  );
}
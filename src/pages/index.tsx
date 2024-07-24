import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const rol = 'INCOGNITO';
    Cookie.set('rol', rol);
    router.push('/Paginas');
  }, [router]);

  if (!mounted) {
    return null;
  }

  return (
    <main className={`w-full h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <p>
        Redirecting...
      </p>
    </main>
  );
}

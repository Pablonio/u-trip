import { useRouter } from 'next/router';

export default function Error04() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Pagina no encontrada</h1>
      <p className="mb-8">Lo sentimos, la página que buscas no existe.</p>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Ve a la página de inicio
      </button>
    </div>
  );
}

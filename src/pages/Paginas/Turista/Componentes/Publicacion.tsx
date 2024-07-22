import exp from 'constants';
import React from 'react';

export default function Publicacion() {


    const [formData, setFormData] = useState<FormData>({
        tituloPost: '',
        fechaPublicacion: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Publicacion:', formData);
        try {
            const response = await axios.post('/api/Publicacion/crearPublicacion', {
                idUsuario: 1,
                tituloPost: formData.tituloPost,
                fechaPublicacion: formData.fechaPublicacion
            });
            console.log('Respuesta:', response.data);

            if (response.data.success) {
                setMensaje('Publicación exitosa');
            } else {
                setMensaje('Error al publicar: ' + response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Error al publicar: ' + error);
        }
    };  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full h-full p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center dark:text-white">Publicacion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="tituloPost">
              Titulo
            </label>
            <input
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="tituloPost"
              type="text"
              placeholder="Titulo"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="fechaPublicacion">
              Fecha de publicación
            </label>
            <input
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="fechaPublicacion"
              type="date"
              placeholder="Fecha de publicación"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
}
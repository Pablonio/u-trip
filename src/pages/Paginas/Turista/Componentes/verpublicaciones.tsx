import { useEffect, useState } from 'react';
import axios from 'axios';

type Publicacion = {
    id: number;
    tituloPost: string;
    fechaPublicacion: string;
    usuario: {
        id: number;
        nombre: string;
        apellido: string;
    };
    imagenes:{
        id: number;
        url: string;
        tituloImg: string;
        usuario:{
            id: number;
            nombre: string;
            apellido: string;
        }
    };
    comentarios: {
        id: number;
        texto: string;
        fechaPublicacion: string;
        usuario: {
            id: number;
            nombre: string;
            apellido: string;
        };
    }[];
    reacciones: {
        id: number;
        reaccion: string;
        fechaPublicacion: string;
        usuario: {
            id: number;
            nombre: string;
            apellido: string;
        };
    }[];
};

const Publicacionesturista: React.FC = () => {
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/Publicacion/recuperarpublicacion'); // Ruta de la API que has definido
                setPublicaciones(response.data.response); // Asumiendo que la estructura de datos es { success: boolean, response: Publicacion[] }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error al obtener las publicaciones');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="overscroll-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Publicaciones</h1>
            {publicaciones.map((publicacion) => (
                <div key={publicacion.id} className="mb-6 p-4 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-2">{publicacion.tituloPost}</h2>
                <p className="text-gray-600 mb-1">Fecha de Publicación: {publicacion.fechaPublicacion}</p>
                <p className="text-gray-600 mb-1">
                    Autor: {publicacion.usuario.nombre} {publicacion.usuario.apellido}
                </p>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Comentarios:</h3>
                    <ul className="list-disc list-inside ml-4">
                    {publicacion.comentarios.map((comentario) => (
                        <li key={comentario.id} className="mb-2">
                        <p className="text-gray-800">{comentario.texto}</p>
                        <p className="text-gray-600">Fecha de Publicación: {comentario.fechaPublicacion}</p>
                        <p className="text-gray-600">
                            Autor: {comentario.usuario.nombre} {comentario.usuario.apellido}
                        </p>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Reacciones:</h3>
                    <ul className="list-disc list-inside ml-4">
                    {publicacion.reacciones.map((reaccion) => (
                        <li key={reaccion.id} className="mb-2">
                        <p className="text-gray-800">{reaccion.reaccion}</p>
                        <p className="text-gray-600">Fecha de Publicación: {reaccion.fechaPublicacion}</p>
                        <p className="text-gray-600">
                            Autor: {reaccion.usuario.nombre} {reaccion.usuario.apellido}
                        </p>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            ))}
            </div>
    );
};

export default Publicacionesturista;
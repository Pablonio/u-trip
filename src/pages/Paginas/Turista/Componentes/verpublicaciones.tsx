import { useEffect, useState } from 'react';
import axios from 'axios';
//datos recuperados para la publicacion
type Publicacion = {
    id: number;
    tituloPost: string;
    fechaPublicacion: string;
    usuario: {
        id: number;
        nombre: string;
        apellido: string;
    };
    Imagen: {  
        id: number;
        url: string;
        tituloImg: string;
    }[];
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
                const response = await axios.get('/api/Publicacion/recuperarpublicacion');
                setPublicaciones(response.data.response);
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
        <div className="overscroll-auto p-4 bg-gray-100 rounded-lg shadow-md max-w-7xl	">
            <h1 className="text-3xl font-bold mb-4">Publicaciones</h1>
            {publicaciones.map((publicacion) => (
                <div key={publicacion.id} className="mb-6 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-2">{publicacion.tituloPost}</h2>
                    <p className="text-gray-600 mb-1">Fecha de Publicación: {publicacion.fechaPublicacion}</p>
                    <p className="text-gray-600 mb-1">
                        Autor: {publicacion.usuario.nombre} {publicacion.usuario.apellido}
                    </p>
                    
                    {/* Mostrar Imágenes */}
                    {publicacion.Imagen.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold mb-2">Imágenes:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {publicacion.Imagen.map((imagen) => (
                                    <div key={imagen.id} className="relative">
                                        <img
                                            src={imagen.url}
                                            alt={imagen.tituloImg || 'Imagen'}
                                            className="w-full h-auto object-cover rounded-lg shadow-md"
                                        />
                                        {imagen.tituloImg && (
                                            <p className="absolute bottom-2 left-2 text-white bg-gray-800 bg-opacity-60 p-1 rounded">
                                                {imagen.tituloImg}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Mostrar Comentarios */}
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

                    {/* Mostrar Reacciones */}
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

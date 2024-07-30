import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

export type Publicacion = {
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
        comentariosDeComentario: {
            id: number;
            idComentario: number;
            fechaPublicacion: string;
            comentario: {
                id: number;
                texto: string;
            };
            respuesta: string;
            flag: string;
        }[];
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
    emogisParaReaccionarPublicacion: {
        id: number;
        emogi: string;
        flag: string;
        emogiComentario: {
            id: number;
            idEmogi: number;
            emogiComentario: string;
            flag: string;
        }[];
    }[];
    reaccionConteo?: { [key: string]: number };
};

export default function Publicacionesturista() {
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [selectedPublicacion, setSelectedPublicacion] = useState<Publicacion | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPublicaciones = async () => {
        try {
            const response = await axios.get('/api/Publicacion/recuperarpublicacion');
            console.log('Respuesta:', response.data);
            const publicacionesData: Publicacion[] = response.data.response;

            const publicacionesConConteo = publicacionesData.map((publicacion) => {
                const reaccionConteo: { [key: string]: number } = {};
                publicacion.reacciones.forEach(reaccion => {
                    if (reaccionConteo[reaccion.reaccion]) {
                        reaccionConteo[reaccion.reaccion]++;
                    } else {
                        reaccionConteo[reaccion.reaccion] = 1;
                    }
                });
                return { ...publicacion, reaccionConteo };
            });

            setPublicaciones(publicacionesConConteo);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
            setError('Error al obtener las publicaciones');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublicaciones();

        const intervalId = setInterval(fetchPublicaciones, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleCardClick = (publicacion: Publicacion) => {
        setSelectedPublicacion(publicacion);
    };

    const handleBackClick = () => {
        setSelectedPublicacion(null);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">Publicaciones</h1>
            {selectedPublicacion ? (
                <div className="flex flex-col items-center">
                    <button 
                        onClick={handleBackClick} 
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Volver a las publicaciones
                    </button>
                    <div className="w-full max-w-4xl">
                        <Card 
                            publicacion={selectedPublicacion} 
                            onClick={() => {}}
                            isDetailedView={true}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {publicaciones.map((publicacion) => (
                        <div key={publicacion.id} className="w-full max-w-4xl mx-auto">
                            <Card 
                                publicacion={publicacion} 
                                onClick={() => handleCardClick(publicacion)} 
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

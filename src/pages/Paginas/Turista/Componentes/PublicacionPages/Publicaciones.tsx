import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Ajusta la ruta según la estructura de tu proyecto

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
};

const Publicacionesturista: React.FC = () => {
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [selectedPublicacion, setSelectedPublicacion] = useState<Publicacion | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePublicaciones = await axios.get('/api/Publicacion/recuperarpublicacion');
                console.log('Respuesta Publicaciones:', responsePublicaciones.data);
                setPublicaciones(responsePublicaciones.data.response);
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

    const handleCardClick = (publicacion: Publicacion) => {
        setSelectedPublicacion(publicacion);
    };

    const handleBackClick = () => {
        setSelectedPublicacion(null);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-7xl">
            <h1 className="text-3xl font-bold mb-4">Publicaciones</h1>
            {selectedPublicacion ? (
                <div>
                    <button onClick={handleBackClick} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Volver a las publicaciones
                    </button>
                    <Card publicacion={selectedPublicacion} onClick={() => {}} />
                </div>
            ) : (
                publicaciones.map((publicacion) => (
                    <Card key={publicacion.id} publicacion={publicacion} onClick={() => handleCardClick(publicacion)} />
                ))
            )}
        </div>
    );
};

export default Publicacionesturista;

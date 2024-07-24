import {useEffect, useState} from 'react';
import axios from 'axios';

export default function PaginaPublicacion(){
    const [publicaciones, setPublicaciones] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchPublicaciones = async ()=>{
            try{
                const response = await axios.get('/api/publicacion');
               setPublicaciones(response.data.response);
               setLoading(false);
            } catch(error){
                console.error('Fallo al obtener publicaiones');
                setError('Fallo al obtener publicaciones');
                setLoading(false);
            }
        };
        fetchPublicaciones();
    }, []);
    if(error){
        return <div>Error: {error}</div>;
    }
    return (
        <div className=''>
             <h1>Publicaciones</h1>
             {publicaciones.map((publicacion)=>(
                <div key={publicacion.id}>
                    <h2>{publicacion.tituloPost}</h2>
                    <p>Fecha de publicación: {publicacion.fechaPublicacion}</p>
                    <p>Publicado por: {publicacion.usuario.nombre} {publicacion.usuariop.apellido}</p>
                    <h3>Comentarios:</h3>
                    <ul>
                        
                    </ul>
                </div>
             ))}
        </div>      
    );
};
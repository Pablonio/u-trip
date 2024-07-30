import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

type Itinerario = {
    id: number;
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
}

export default function Itinerario() { 

    const [itinerarioss, setItinerarioss] = useState<Itinerario[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(()=>{
        const fetchItinerarios = async()=>{
            try{
                const response = await axios.get('/api/Itinerario/recuperaritinerarios',{params:{search:searchTerm}});
                console.log(response.data.response);
                if(response.data.success){
                    setItinerarioss(response.data.response);
                } else {
                    console.error('Fallo al obtener los itinerarios:', response.data.error);
                }
            } catch (error) {
                console.error('Fallo al conectarse con la API:', error);
            }
        };
        fetchItinerarios();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(e.target.value);
    }

    return (
        <div className='max-w-auto mx-auto p-8 bg-gray-50 shadow-lg rounded-lg bg-white dark:bg-gray-800'>
            <div className='w-full max-w-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
            <h1 className="text-center text-2xl font-bold mb-4">Itinerarios</h1>
            <input
                type='text'
                placeholder='Busca por nombre de itinerario o fecha de inicio (dd/mm/aaaa)'
                value={searchTerm}
                onChange={handleSearchChange}
                className='mb-4 p-2 border border-gray-300 rounded w-full max-w-lg'
                />
                {itinerarioss.length === 0 ? (
                    <span className="block p-4 bg-yellow-100 text-yellow-900 rounded">No hay itinerarios</span>
                ):(
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>ID</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nombre</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Descripcion</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha de Inicio</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha de Fin</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {itinerarioss.map((itinerario: Itinerario) =>(
                                <tr key={itinerario.id} className='bg-white'>
                                    <td className='px-6 py-4 whitespace-nowrap'>{itinerario.id}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{itinerario.nombre}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{itinerario.descripcion}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{ new Date(itinerario.fechaInicio).toLocaleDateString()}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{ new Date(itinerario.fechaFin).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                </div>
        </div>
    );
}
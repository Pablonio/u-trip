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

    useEffect(()=>{
        const fetchItinerarios = async()=>{
            try{
                const response = await axios.get('/api/Itinerario/recuperaritinerarios');
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

    return (
        <div >
            <h1 className="p-6">Itinerarios</h1>
                {itinerarioss.length === 0 ? (
                    <span className="block p-4 bg-yellow-100 text-yellow-900 rounded">No hay itinerarios</span>
                ):(
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Fecha de Inicio</th>
                                <th>Fecha de Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itinerarioss.map((itinerario: Itinerario) =>(
                                <tr key={itinerario.id}>
                                    <td>{itinerario.id}</td>
                                    <td>{itinerario.nombre}</td>
                                    <td>{itinerario.descripcion}</td>
                                    <td>{ new Date(itinerario.fechaInicio).toLocaleDateString()}</td>
                                    <td>{ new Date(itinerario.fechaFin).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    );
}
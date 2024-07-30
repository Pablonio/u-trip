import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

type Usuario = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
};
type Itinerario = {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
};
type PaqueteTuristico = {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
};
type Reserva = {
  id: number;
  fechaReserva: string;
  estado: string;
  usuario: Usuario;
  paquete: PaqueteTuristico;
  itinerarios: Itinerario[];
};

export default function Reserva() {
  const [reservass, setReservass] = useState<Reserva[]>([]);
  const[searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("/api/Reserva/recuperarreservas", {params: {search: searchTerm || ''}});
        if (response.data.success) {
          setReservass(response.data.response);
        } else {
          console.error("Fallo al obtener las reservas:", response.data.error);
        }
      } catch (error) {
        console.error("Fallo al conectarse con la API", error);
      }
    };
    fetchReservas();
  }, [searchTerm]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-auto mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-4">Reservas</h1>
      <input
        type="text"
        placeholder="Buscar por nombre de usuario, estado o nombre del paquete"
        value={searchTerm}
        onChange={handleChangeSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-lg"
      />
      {reservass.length === 0 ? (
        <span className="block p-4 bg-yellow-100 text-yellow-900 rounded">No hay reservas</span>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Reserva</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paquete</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Itinerarios</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservass.map((reserva: Reserva) => (
              <tr key={reserva.id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{reserva.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(reserva.fechaReserva).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.estado}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reserva.usuario.nombre}
                  {reserva.usuario.apellido}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reserva.paquete.nombre}(
                  {new Date(reserva.paquete.fechaInicio).toLocaleDateString()}-
                  {new Date(reserva.paquete.fechaFin).toLocaleDateString()})
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reserva.itinerarios.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {reserva.itinerarios.map((itinerario) => (
                        <li key={itinerario.id} className="mb-2">
                          {itinerario.nombre}(
                          {new Date(
                            itinerario.fechaInicio
                          ).toLocaleDateString()}
                          -{new Date(itinerario.fechaFin).toLocaleDateString()})
                          <p className="text-sm text-gray-500 mt-1">{itinerario.descripcion}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">No hay itinerarios</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

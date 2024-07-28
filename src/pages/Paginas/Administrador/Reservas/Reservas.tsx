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

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("/api/Reserva/recuperarreservas");
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
  }, []);

  return (
    <div>
      <h1>Reservas</h1>
      {reservass.length === 0 ? (
        <span>No hay reservas</span>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de Reserva</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Paquete</th>
              <th>Itinerarios</th>
            </tr>
          </thead>
          <tbody>
            {reservass.map((reserva: Reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.fechaReserva}</td>
                <td>{reserva.estado}</td>
                <td>
                  {reserva.usuario.nombre}
                  {reserva.usuario.apellido}
                </td>
                <td>
                  {reserva.paquete.nombre}(
                  {new Date(reserva.paquete.fechaInicio).toLocaleDateString()}-
                  {new Date(reserva.paquete.fechaFin).toLocaleDateString()})
                </td>
                <td>
                  {reserva.itinerarios.length > 0 ? (
                    <ul>
                      {reserva.itinerarios.map((itinerario) => (
                        <li key={itinerario.id}>
                          {itinerario.nombre}(
                          {new Date(
                            itinerario.fechaInicio
                          ).toLocaleDateString()}
                          -{new Date(itinerario.fechaFin).toLocaleDateString()})
                          <p>{itinerario.descripcion}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No hay itinerarios</span>
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

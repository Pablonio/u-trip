import React, { useState } from "react";
import NavBar from "./Componente/NavBar";
import ListaUsuarios from "./Usuarios/Usuarios";
import Itinerario from "./Itinerarios/Itinerarios";
import Reservas from "./Reservas/Reservas";
import Saludo from "./PanelPrincipal/Saludo"
//Constantes que almacenan un componente renderizado.
const Usuarios = () => <ListaUsuarios />;
const Itinerarios = () => <Itinerario />;
const Reserva = () => <Reservas />;
const Saludito =()=> <Saludo/>;

export default function Administrador() {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState("Bienvenido");

  const handleNavbar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setComponenteSeleccionado(event.currentTarget.id);
  };
//Opciones de la barra lateral
  const renderizadoComponente = () => {
    switch (componenteSeleccionado) {
      case "Bienvenido":
        return <Saludo/>; 
      case "Usuarios":
        return <Usuarios/>;
      case "Itinerarios":
        return <Itinerarios />;
      case "Reservas":
        return <Reserva />;
      default:
        return <Usuarios />;
    }
  };

  return (
    <div className='h-screen w-full bg-white relative flex overflow-hidden'>
      <NavBar handleNavbar={handleNavbar} />
      <div className='flex-1 p-4'>
        {renderizadoComponente()}
      </div>
    </div>
  );
}

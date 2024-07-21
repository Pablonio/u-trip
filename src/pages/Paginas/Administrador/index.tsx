import React, { useState } from "react";
import NavBar from "./Componente/NavBar";
import Usuario from "./Usuarios/Usuarios";
import Itinerario from "./Itinerarios/Itinerarios";
import Reservas from "./Reservas/Reservas";

const Usuarios = () => <Usuario />;
const Itinerarios = () => <Itinerario />;
const Reserva = () => <Reservas />;

export default function Administrador() {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState("Bienvenido");

  const handleNavbar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setComponenteSeleccionado(event.currentTarget.id);
  };

  const renderizadoComponente = () => {
    switch (componenteSeleccionado) {
      case "Bienvenido":
        return <div>Bienvenido</div>;
      case "Usuarios":
        return <Usuarios />;
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

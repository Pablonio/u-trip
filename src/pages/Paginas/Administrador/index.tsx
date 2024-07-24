import React, { useState } from "react";
import NavBar from "../Componentes/NavBar";
import ListaUsuarios from "./Usuarios/Usuarios";
import Itinerario from "./Itinerarios/Itinerarios";
import Reservas from "./Reservas/Reservas";
import Saludo from "./PanelPrincipal/Saludo";
import { AiOutlineTeam, AiTwotoneReconciliation, AiTwotoneSchedule, AiOutlineSetting } from "react-icons/ai";

// Constantes que almacenan un componente renderizado.
const Usuarios = () => <ListaUsuarios />;
const Itinerarios = () => <Itinerario />;
const Reserva = () => <Reservas />;
const Saludito = () => <Saludo />;

export default function Administrador() {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState("Bienvenido");

  const handleNavbar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setComponenteSeleccionado(event.currentTarget.id);
  };

  // Opciones de la barra lateral
  const adminNavBar = [
    { id: "Bienvenido", icon: <AiOutlineSetting className='size-8' />, label: "Bienvenido" },
    { id: "Usuarios", icon: <AiOutlineTeam className='size-8' />, label: "Usuarios" },
    { id: "Itinerarios", icon: <AiTwotoneReconciliation className='size-8' />, label: "Itinerarios" },
    { id: "Reservas", icon: <AiTwotoneSchedule className='size-8' />, label: "Reservas" }
  ];

  const renderizadoComponente = () => {
    switch (componenteSeleccionado) {
      case "Bienvenido":
        return <Saludo />;
      case "Usuarios":
        return <Usuarios />;
      case "Itinerarios":
        return <Itinerarios />;
      case "Reservas":
        return <Reserva />;
      default:
        return <Saludito />;
    }
  };

  return (
    <div className='h-screen w-full bg-white relative flex overflow-hidden'>
      <NavBar navItems={adminNavBar} handleNavbar={handleNavbar} />
      <div className='flex-1 p-4'>
        {renderizadoComponente()}
      </div>
    </div>
  );
}

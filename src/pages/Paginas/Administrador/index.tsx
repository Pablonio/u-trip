import React, { useState } from 'react';
import { AiTwotoneReconciliation, AiTwotoneSchedule, AiOutlineTeam, AiOutlineUsergroupAdd } from "react-icons/ai";
import NavBar from '../Componentes/NavBar'; 
import PaginaInicial from '../Turista/Componentes/PaginaInicial';
import PerfilUsuario from '../Componentes/Perfil';
import ListaUsuarios from './Usuarios/Usuarios';
import Itinerario from './Itinerarios/Itinerarios';
import Reserva from './Reservas/Reservas';


export default function Feed() {
    const [componenteSeleccionado, setComponenteSeleccionado] = useState("Bienvenido");

    const handleNavbar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | null) => {
        if (event) {
            setComponenteSeleccionado(event.currentTarget.id);
        }
    };

    const turistaNavBar = [
        { id: "Usuariosss", icon: <AiOutlineTeam className='size-8' />, label: "Usuarios" },
        {id: "Itinerariosss", icon: <AiTwotoneSchedule className='size-8' />, label: "Itinerarios" },
        { id: "Reservasss", icon: <AiTwotoneReconciliation className='size-8' />, label: "Reservas" },
        { id: "Perfil", icon: <AiOutlineUsergroupAdd className='size-8' />, label: "Perfil" }
    ];

    const renderizadoComponente = () => {
        switch (componenteSeleccionado) {
            case "Usuariosss":
                return <ListaUsuarios />;
            case "Itinerariosss":
                return <Itinerario />;
            case "Reservasss":
                return <Reserva />;
            case "Perfil":
                return <PerfilUsuario />;
            default:
                return <PaginaInicial />;
        }
    };

    



    return (
        <div className='h-screen w-full bg-gray-100 relative flex '>
          <NavBar navItems={turistaNavBar} handleNavbar={handleNavbar} />
          <div className='flex-1 p-4'>
            {renderizadoComponente()}
          </div>
        </div>
  );
}

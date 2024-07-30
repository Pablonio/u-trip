import React, { useState } from 'react';
import { AiTwotoneReconciliation, AiTwotoneSchedule, AiOutlineTeam, AiOutlineUsergroupAdd, AiOutlineMenu } from "react-icons/ai";
import NavBar from '../Componentes/NavBar'; 
import PaginaInicial from '../Turista/Componentes/PaginaInicial';
import PerfilUsuario from '../Componentes/Perfil';
import ListaUsuarios from './Usuarios/Usuarios';
import Itinerario from './Itinerarios/Itinerarios';
import Reserva from './Reservas/Reservas';
import ToggleDarkWhite from '../Componentes/ToggleDarkWhite';

export default function Feed() {
    const [componenteSeleccionado, setComponenteSeleccionado] = useState("Bienvenido");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavbar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | null) => {
        if (event) {
            setComponenteSeleccionado(event.currentTarget.id);
        }
    };

    const turistaNavBar = [
        { id: "Usuariosss", icon: <AiOutlineTeam className='size-8' />, label: "Usuarios" },
        { id: "Itinerariosss", icon: <AiTwotoneSchedule className='size-8' />, label: "Itinerarios" },
        { id: "Reservasss", icon: <AiTwotoneReconciliation className='size-8' />, label: "Reservas" },
        { id: "Perfil", icon: <AiOutlineUsergroupAdd className='size-8' />, label: "Perfil" }
    ];

    const renderizadoComponente = () => {
        switch (componenteSeleccionado) {
            case "Usuariosss":
                return <ListaUsuarios/>;
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
        <div className='h-screen w-full bg-gray-100 relative flex'>
            {isSidebarOpen && (
                <NavBar
                    navItems={turistaNavBar}
                    handleNavbar={handleNavbar}
                    toggleSidebar={toggleSidebar}
                />
            )}

            {/* Botón de ToggleDarkWhite */}
            <div className="fixed top-4 right-4 z-50">
                <ToggleDarkWhite />
            </div>

            <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {renderizadoComponente()}
            </div>
            {/* Botón de alternancia circular, solo visible cuando el sidebar está oculto */}
            {!isSidebarOpen && (
                <div className="fixed top-4 left-4 z-50">
                    <button
                        className="p-2 bg-blue-500 text-white rounded-full shadow-lg focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <AiOutlineMenu size={24} />
                    </button>
                </div>
            )}
        </div>
    );
}

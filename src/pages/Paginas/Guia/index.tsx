import React, { useState } from 'react';
import { AiTwotoneReconciliation, AiOutlineMenu } from "react-icons/ai";
import NavBar from '../Componentes/NavBar'; 
import PaginaInicial from './Componentes/PaginaInicial';
import PerfilUsuario from '../Componentes/Perfil';
import ToggleDarkWhite from '../Componentes/ToggleDarkWhite';

export default function Feed() {
    const [componenteSeleccionado, setComponenteSeleccionado] = useState("Bienvenido");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mostrarPerfil, setMostrarPerfil] = useState(false);

    const handleNavbar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | null) => {
        if (event) {
            setComponenteSeleccionado(event.currentTarget.id);
            setMostrarPerfil(false); // Ocultar perfil si se selecciona otro componente
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handlePerfilClick = () => {
        setMostrarPerfil(true);
        setComponenteSeleccionado("Perfil"); // Cambiar el componente seleccionado a "Perfil"
    };

    const turistaNavBar = [
        { id: "Bienvenido", icon: <AiTwotoneReconciliation className='size-8' />, label: "Itinerarios" }
    ];

    const renderizadoComponente = () => {
        switch (componenteSeleccionado) {
            case "Bienvenido":
                return <PaginaInicial />;
            case "Perfil":
                return <PerfilUsuario />;
            default:
                return <PaginaInicial />;
        }
    };

    return (
        <div className='h-screen w-full bg-gray-100 dark:bg-gray-900 flex'>
            {isSidebarOpen && (
                <NavBar 
                    navItems={turistaNavBar} 
                    handleNavbar={handleNavbar} 
                    toggleSidebar={toggleSidebar} 
                    onPerfilClick={handlePerfilClick} 
                />
            )}
            
            {/* Botón de ToggleDarkWhite */}
            <div className="fixed top-4 right-4 z-50">
                <ToggleDarkWhite />
            </div>

            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} p-4 `}>
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


import React, { useState } from 'react';
import { AiTwotoneReconciliation, AiTwotoneSchedule } from "react-icons/ai";
import NavBar from '../Componentes/NavBar'; 
import PaginaInicial from './Componentes/PaginaInicial';
import PerfilUsuario from '../Componentes/Perfil';
import Publicaciones from './Componentes/PublicacionPages/Publicaciones';



export default function Feed() {
    const [componenteSeleccionado, setComponenteSeleccionado] = useState("Bienvenido");

    const handleNavbar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | null) => {
        if (event) {
            setComponenteSeleccionado(event.currentTarget.id);
        }
    };

    const turistaNavBar = [
        { id: "Bienvenido", icon: <AiTwotoneReconciliation className='size-8' />, label: "Itinerarios" },
        { id: "Perfil", icon: <AiTwotoneSchedule className='size-8' />, label: "Reservas" }
    ];

    const renderizadoComponente = () => {
        switch (componenteSeleccionado) {
            case "Bienvenido":
                return <Publicaciones />;
            case "Perfil":
                return <PerfilUsuario />;
            default:
                return <PaginaInicial />;
        }
    };

    



    return (
        <div className='h-screen w-full bg-gray-100 relative flex '>
            <NavBar navItems={turistaNavBar} handleNavbar={handleNavbar} />
            <div className='flex-1 ml-64 p-4 min-h-screen'>
                {renderizadoComponente()}
            </div>
        </div>
    );
}

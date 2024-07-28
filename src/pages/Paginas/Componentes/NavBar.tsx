import React, { useState } from "react";
import PerfilUsuario from "./Perfil";
import Modal from "./Modal";

interface NavBarProps {
    handleNavbar: (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | null) => void;
    navItems: Array<{ id: string; icon: JSX.Element; label: string }>;
}

const NavBar: React.FC<NavBarProps> = ({ handleNavbar, navItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModalPerfil = () => {
        openModal();
        handleNavbar(null);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {isSidebarOpen && (
                <aside className="top-0 w-64 h-screen bg-gray-900 text-white p-4 fixed">
                    <div className="flex flex-col space-y-5">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out"
                            >
                                {item.icon}
                                <span
                                    id={item.id}
                                    onClick={handleNavbar}
                                    className="font-medium text-sm"
                                >
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <a
                        className="rounded-md hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out mt-4 p-3"
                        onClick={openModalPerfil}
                    >
                        Perfil
                    </a>
                    {isModalOpen && (
                        <Modal onClose={closeModal}>
                            <PerfilUsuario />
                        </Modal>
                    )}
                </aside>
            )}

            {/* Botón de alternancia, siempre visible */}
            <div className="fixed bottom-4 left-4">
                <button
                    className="p-2 bg-blue-500 text-white rounded-md focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                </button>
            </div>
        </div>
    );
};

export default NavBar;

import React, { useState } from "react";
import PerfilUsuario from "./Perfil";
import Modal from "./Modal";

interface NavBarProps {
    handleNavbar: (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | null) => void;
    navItems: Array<{ id: string; icon: JSX.Element; label: string }>;
}

const NavBar: React.FC<NavBarProps> = ({ handleNavbar, navItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModalPerfil = () => {
        openModal();
        handleNavbar(null);
    };

    return (
        <div className="flex-box h-screen bg-white flex ">
            <aside className="sticky top-0 w-64 h-screen bg-gray-900 text-white p-4">
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
        </div>
    );
};

export default NavBar;

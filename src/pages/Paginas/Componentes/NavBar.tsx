import React from "react";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

interface NavBarProps {
    handleNavbar: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | null) => void;
    navItems?: Array<{ id: string; icon: JSX.Element; label: string }>;
    toggleSidebar: () => void;
    onPerfilClick: () => void;
}

export default function NavBar({ handleNavbar, navItems = [], toggleSidebar, onPerfilClick }: NavBarProps) {
    const router = useRouter();

    const handleSalir = () => {
        Cookies.remove('rol');
        Cookies.remove('idUsuario');
        router.push('/');
    };

    return (
        <div className="fixed top-0 left-0 md:w-64 w-full h-screen bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center p-4 md:hidden">
                    <button className="text-white focus:outline-none" onClick={toggleSidebar}>
                        <AiOutlineClose size={24} />
                    </button>
                </div>
                <div className="flex flex-col space-y-5 p-4">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out"
                            id={item.id}
                            onClick={(e) => handleNavbar(e)}
                        >
                            {item.icon}
                            <span className="font-medium text-sm">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-5 p-4">
                <div
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out"
                    onClick={onPerfilClick}
                >
                    <AiOutlineUser size={24} />
                    <span className="font-medium text-sm">
                        Perfil
                    </span>
                </div>
                <CiLogout 
                    size={40} 
                    className="text-white cursor-pointer transform transition duration-300 ease-in-out hover:text-red-500 hover:scale-110 hover:bg-gray-800 p-2 rounded-full"
                    onClick={handleSalir} 
                />
            </div>
        </div>
    );
}

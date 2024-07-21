
import React from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { AiTwotoneReconciliation } from "react-icons/ai";
import { AiTwotoneSchedule } from "react-icons/ai";

interface NavBarProps {
    handleNavbar: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}


export default function NavBar({ handleNavbar }: NavBarProps) {

    const arrayNavBar = [
        {
            id: "Usuarios",
            icon: <AiOutlineTeam className='size-8' />,
            label: "Usuarios"
        },
        {
            id: "Itinerarios",
            icon: <AiTwotoneReconciliation className='size-8' />,
            label: "Itinerarios"
        },
        {
            id: "Reservas",
            icon: <AiTwotoneSchedule className='size-8' />,
            label: "Reservas"
        }
    ];
    return (
        <div className='h-screen w-full bg-white relative flex overflow-hidden'>
            <aside className='w-64 h-screen bg-gray-900 text-white p-4'>
                <div className='flex flex-col space-y-5'>
                    {arrayNavBar.map((item, index) => (
                        <div key={index} className='flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out'>
                            {item.icon}
                            <span id={item.id} onClick={handleNavbar} className='font-medium text-sm'>{item.label}</span>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}

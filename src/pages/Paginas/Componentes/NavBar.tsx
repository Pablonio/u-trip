import React from "react";

interface NavBarProps {
    handleNavbar: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    navItems: Array<{ id: string; icon: JSX.Element; label: string }>;
}

export default function NavBar({ handleNavbar, navItems }: NavBarProps) {
    return (
        <div className='h-screen bg-white relative flex overflow-hidden'>
            <aside className='w-64 h-screen bg-gray-900 text-white p-4'>
                <div className='flex flex-col space-y-5'>
                    {navItems.map((item, index) => (
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

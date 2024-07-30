import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import { MdStar } from 'react-icons/md';

export default function Saludo() {
    return (
        <div className="bg-gray-100 min-h-screen p-8 flex items-center justify-center">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 flex items-center space-x-6">

                <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-blue-600">
                        <FaUserCircle className="w-16 h-16" />
                    </div>
                </div>
                <div className="text-center flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-2">
                        <MdStar className="w-8 h-8 text-yellow-500" />
                        <span>¡Bienvenido, Administrador!</span>
                    </h1>
                    <p className="text-gray-600">
                        Estamos encantados de tenerte aquí. Explora las diferentes secciones para gestionar tu plataforma de manera eficiente.
                    </p>
                </div>
            </div>
        </div>
    );
}

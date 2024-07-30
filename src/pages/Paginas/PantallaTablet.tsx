import React from 'react';
import InicioSesion from './Componentes/InicioDeSesion';

export default function PantallaTablet() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <InicioSesion />
        </div>
    );
}
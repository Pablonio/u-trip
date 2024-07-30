import React from 'react';

type Autor = {
    nombre?: string;
    apellido?: string;
};

type CardHeaderProps = {
    tituloPost: string;
    fechaPublicacion: string; // Fecha en formato ISO o similar
    autor?: Autor;  // Autor es opcional
};

// Función para formatear la fecha en formato YYYY-MM-DD
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son indexados desde 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function CardHeader({ tituloPost, fechaPublicacion, autor }: CardHeaderProps) {
    const autorNombre = autor?.nombre || 'Desconocido';
    const autorApellido = autor?.apellido || '';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{tituloPost}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Fecha de Publicación: {formatDate(fechaPublicacion)}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
                Autor: {autorNombre} {autorApellido}
            </p>
        </div>
    );
}

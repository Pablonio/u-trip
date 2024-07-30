import React from 'react';

type Autor = {
    nombre?: string;
    apellido?: string;
};

type CardHeaderProps = {
    tituloPost: string;
    fechaPublicacion: string;
    autor?: Autor;  // Autor es opcional
};

export default function CardHeader({ tituloPost, fechaPublicacion, autor }: CardHeaderProps) {
    const autorNombre = autor?.nombre || 'Desconocido';
    const autorApellido = autor?.apellido || '';

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">{tituloPost}</h2>
            <p className="text-gray-600 mb-1">Fecha de Publicación: {fechaPublicacion}</p>
            <p className="text-gray-600 mb-1">
                Autor: {autorNombre} {autorApellido}
            </p>
        </div>
    );
}

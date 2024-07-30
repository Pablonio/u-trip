import React from 'react';

type CardHeaderProps = {
    tituloPost: string;
    fechaPublicacion: string;
    autor: {
        nombre: string;
        apellido: string;
    };
};

export default function CardHeader({ tituloPost, fechaPublicacion, autor }: CardHeaderProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">{tituloPost}</h2>
            <p className="text-gray-600 mb-1">Fecha de Publicación: {fechaPublicacion}</p>
            <p className="text-gray-600 mb-1">
                Autor: {autor.nombre} {autor.apellido}
            </p>
        </div>
    );
};
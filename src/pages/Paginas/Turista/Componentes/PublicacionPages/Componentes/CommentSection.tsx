import React from 'react';

type Comment = {
    id: number;
    usuario: {
        nombre: string;
        apellido: string;
    };
    texto: string;
};

type CommentSectionProps = {
    comments?: Comment[];  
};

export default function CommentSection({ comments = [] }: CommentSectionProps) {
    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Comentarios:</h3>
            {comments.length > 0 ? (
                comments.map((comentario) => (
                    <div key={comentario.id} className="border-b py-2">
                        <p className="text-gray-800 font-semibold">
                            {comentario.usuario.nombre} {comentario.usuario.apellido}
                        </p>
                        <p className="text-gray-600">{comentario.texto}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No hay comentarios todavía.</p>
            )}
        </div>
    );
}

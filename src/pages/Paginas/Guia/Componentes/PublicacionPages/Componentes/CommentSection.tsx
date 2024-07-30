import React, { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  id: number;
  nombre: string;
  apellido: string;
};

type Reaction = {
  id: number;
  reaccion: string;
  fechaPublicacion: string;
  usuario: User;
};



type Comment = {
  id: number;
  texto: string;
  fechaPublicacion: string;
  usuario: User;
  reacciones: Reaction[];
  comentariosDeComentario: {
    id: number;
    idComentario: number;
    fechaPublicacion: string;
    comentario: {
      id: number;
      texto: string;

    };
    respuesta: string;
    flag: string;
  }[];
};

type CommentSectionProps = {
  comments?: Comment[];
};

export default function CommentSection({ comments = [] }: CommentSectionProps) {
  const [newComment, setNewComment] = useState<string>('');
  const [commentId, setCommentId] = useState<number | null>(null);

  useEffect(() => {
    // Código que depende del cliente puede ir aquí
  }, []);

  const handleAddComment = async (idComentario: number) => {
    if (newComment.trim() === '') return;

    try {
      const response = await axios.post('/api/ComentariosDeComentario/crearComentarioDeComentario', {
        idComentario,
        respuesta: newComment,
      });

      if (response.status === 200) {
        setNewComment('');
        setCommentId(null);
        // Optionally, refetch the comments or update local state
      } else {
        console.error('Error al añadir el comentario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderComments = (comments: Comment[]) => {
    return comments.map((comentario) => (
      <div key={comentario.id} className="border-b border-gray-200 p-4">
        <p>
          <strong>{comentario.usuario.nombre} {comentario.usuario.apellido}</strong>: {comentario.texto}
        </p>
        <div className="ml-4">
          {/* Render nested comments */}
          {comentario.comentariosDeComentario.length > 0 && (
            <div className="ml-4">
              {comentario.comentariosDeComentario.map((subComentario) => (
                <div key={subComentario.id} className="border-b border-gray-200 p-4">
                  <p>
                    {subComentario.comentario ? (
                      <strong>Respuesta: {subComentario.comentario.texto}</strong>
                    ) : (
                      <strong>Comentario no disponible</strong>
                    )}
                    <br />
                    <em>Respuesta: {subComentario.respuesta}</em>
                  </p>
                  <div>
                    <input
                      type="text"
                      value={commentId === subComentario.id ? newComment : ''}
                      onChange={(e) => {
                        setCommentId(subComentario.id);
                        setNewComment(e.target.value);
                      }}
                      placeholder="Añadir un comentario"
                      className="mt-2 p-2 border rounded w-full"
                    />
                    <button
                      onClick={() => handleAddComment(subComentario.id)}
                      className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
                    >
                      Comentar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={commentId === comentario.id ? newComment : ''}
            onChange={(e) => {
              setCommentId(comentario.id);
              setNewComment(e.target.value);
            }}
            placeholder="Añadir un comentario"
            className="mt-2 p-2 border rounded w-full"
          />
          <button
            onClick={() => handleAddComment(comentario.id)}
            className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
          >
            Comentar
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="comment-section">
      {renderComments(comments)}
    </div>
  );
}

import React from 'react';
import CustomModal from '../Modal';

type CommentModalProps = {
    show: boolean;
    onClose: () => void;
    newComment: string;
    onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCommentSubmit: () => void;
    commentError: string;
};

export default function CommentModal({
    show,
    onClose,
    newComment,
    onCommentChange,
    onCommentSubmit,
    commentError
}: CommentModalProps) {
    return (
        <CustomModal
            show={show}
            onClose={onClose}
            title="Agregar Comentario"
            content={
                <div>
                    <input
                        type="text"
                        value={newComment}
                        onChange={onCommentChange}
                        placeholder="Escribe tu comentario"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {commentError && <p className="text-red-600">{commentError}</p>}
                    <button
                        onClick={onCommentSubmit}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Enviar
                    </button>
                </div>
            }
        />
    );
};

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
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 dark:bg-gray-800 dark:text-gray-200">
                    <input
                        type="text"
                        value={newComment}
                        onChange={onCommentChange}
                        placeholder="Escribe tu comentario"
                        className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                    {commentError && <p className="text-red-600 dark:text-red-400">{commentError}</p>}
                    <button
                        onClick={onCommentSubmit}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Enviar
                    </button>
                </div>
            }
        />
    );
}

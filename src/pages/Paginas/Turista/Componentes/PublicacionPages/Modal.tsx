// Modal.tsx
import React from 'react';

type ModalProps = {
    show: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
};

const CustomModal: React.FC<ModalProps> = ({ show, onClose, title, content }) => {
    if (!show) return null; // No renderizar el modal si no se debe mostrar

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div>{content}</div>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default CustomModal;

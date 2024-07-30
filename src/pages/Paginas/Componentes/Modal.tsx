import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Actualiza el estado para indicar que el componente se está ejecutando en el cliente
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Renderiza nada si el código no se está ejecutando en el cliente
        return null;
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.body
    );
}

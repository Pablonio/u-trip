import React from 'react';

type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white dark:bg-gray-700 p-4 rounded shadow-lg w-full max-w-lg relative'>
                <button
                    onClick={onClose}
                    className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import Publicacion from './Publicacion/Publicacion';
import Modal from './Modal';

export default function PaginaInicial() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className='w-full flex flex-col items-center p-4'>
            <div className='w-full max-w-xl'>
                <button
                    onClick={openModal}
                    className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mb-4'
                >
                    Crear Publicación
                </button>
                <div className='bg-white p-4 rounded shadow mb-4'>
                    <p>Publicación de ejemplo</p>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <Publicacion />
                </Modal>
            )}
        </div>
    );
}
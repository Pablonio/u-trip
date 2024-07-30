import React, { useState } from 'react';
import Publicacion from './Publicacion/Publicacion';
import Modal from './Modal';
import Publicaciones from './PublicacionPages/Publicaciones';

export default function PaginaInicial() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='w-full flex flex-col items-center p-4'>
            <div className='w-full max-w-4xl'>
                <button
                    onClick={openModal}
                    className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mb-4'
                >
                    Crear Publicación
                </button>
                <Publicaciones />
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <Publicacion />
                </Modal>
            )}
        </div>
    );
}

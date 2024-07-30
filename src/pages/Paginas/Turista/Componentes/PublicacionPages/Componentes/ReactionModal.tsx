import React from 'react';
import CustomModal from '../Modal';

type ReactionModalProps = {
    show: boolean;
    onClose: () => void;
    selectedEmoji: string | null;
    users: string[];
};

export default function ReactionModal({ show, onClose, selectedEmoji, users }: ReactionModalProps) {
    return (
        <CustomModal
            show={show}
            onClose={onClose}
            title="Reacciones"
            content={
                <div>
                    <h3 className="text-lg font-semibold mb-2">Usuarios que reaccionaron con {selectedEmoji}</h3>
                    {users.length > 0 ? (
                        <ul>
                            {users.map((usuario, index) => (
                                <li key={index} className="text-gray-600">{usuario}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No hay usuarios que hayan reaccionado con este emoji.</p>
                    )}
                </div>
            }
        />
    );
}

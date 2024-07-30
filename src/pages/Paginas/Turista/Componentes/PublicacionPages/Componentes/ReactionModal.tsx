import React from 'react';
import CustomModal from '../Modal';

type ReactionModalProps = {
    show: boolean;
    onClose: () => void;
    selectedEmoji: string | null;
    users: string[];
};

const ReactionModal: React.FC<ReactionModalProps> = ({ show, onClose, selectedEmoji, users }) => {
    return (
        <CustomModal
            show={show}
            onClose={onClose}
            title="Reacciones"
            content={
                <div>
                    <h3 className="text-lg font-semibold mb-2">Usuarios que reaccionaron con {selectedEmoji}</h3>
                    <ul>
                        {users.map((usuario, index) => (
                            <li key={index} className="text-gray-600">{usuario}</li>
                        ))}
                    </ul>
                </div>
            }
        />
    );
};

export default ReactionModal;
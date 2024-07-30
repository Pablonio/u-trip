import React from 'react';

type GroupedReaction = {
    [emoji: string]: {
        count: number;
        usuarios: string[];
    };
};

type ReactionSectionProps = {
    groupedReactions?: GroupedReaction; // Hacer que sea opcional
    openReactionModal: (emoji: string) => void;
};

export default function ReactionSection({
    groupedReactions = {}, // Valor predeterminado para evitar errores
    openReactionModal,
}: ReactionSectionProps) {
    if (!groupedReactions || Object.keys(groupedReactions).length === 0) {
        return (
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Reacciones:</h3>
                <p>No hay reacciones disponibles.</p>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Reacciones:</h3>
            <ul className="flex space-x-2">
                {Object.entries(groupedReactions).map(([emoji, { count }]) => (
                    <li
                        key={emoji}
                        className="flex items-center space-x-1 cursor-pointer"
                        onClick={() => openReactionModal(emoji)}
                    >
                        <span>{emoji}</span>
                        <span>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

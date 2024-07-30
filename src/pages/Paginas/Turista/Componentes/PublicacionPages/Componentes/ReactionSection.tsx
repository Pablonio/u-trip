import React from 'react';

type GroupedReaction = {
    [emoji: string]: {
        count: number;
        usuarios: string[];
    };
};

type ReactionSectionProps = {
    groupedReactions: GroupedReaction;
    openReactionModal: (emoji: string) => void;
};

const ReactionSection: React.FC<ReactionSectionProps> = ({ groupedReactions, openReactionModal }) => {
    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Reacciones:</h3>
            <ul className="flex space-x-2">
                {Object.entries(groupedReactions).map(([emoji, { count }]) => (
                    <li key={emoji} className="flex items-center space-x-1 cursor-pointer" onClick={() => openReactionModal(emoji)}>
                        <span>{emoji}</span>
                        <span>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReactionSection;
import React from 'react';
import { FaSmile, FaComment, FaShare } from 'react-icons/fa';

type ActionButtonsProps = {
    onReactionClick: () => void;
    onCommentClick: () => void;
};

export default function ActionButtons({ onReactionClick, onCommentClick }: ActionButtonsProps) {
    return (
        <div className="flex items-center space-x-4 mt-4">
            <button className="flex items-center space-x-1" onClick={onReactionClick}>
                <FaSmile className="text-2xl" />
                <span>Reaccionar</span>
            </button>
            <button className="flex items-center space-x-1" onClick={onCommentClick}>
                <FaComment className="text-2xl" />
                <span>Comentar</span>
            </button>
            <button className="flex items-center space-x-1">
                <FaShare className="text-2xl" />
                <span>Compartir</span>
            </button>
        </div>
    );
};
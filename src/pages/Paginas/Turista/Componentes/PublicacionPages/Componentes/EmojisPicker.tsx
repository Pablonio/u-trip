import React from 'react';
import Emogis from '../../../../../../dictionaryEmogis/Emogis';

type EmogisType = typeof Emogis;
type EmogisKey = keyof EmogisType;

type EmojiPickerProps = {
    emojis: { id: number; emogi: string }[];
    onEmojiClick: (emoji: string) => void;
    hoveredEmoji: string | null;
    onEmojiMouseEnter: (emoji: string) => void;
    onEmojiMouseLeave: () => void;
};

export default function EmojiPicker({
    emojis,
    onEmojiClick,
    hoveredEmoji,
    onEmojiMouseEnter,
    onEmojiMouseLeave
}: EmojiPickerProps) {
    const getEmoji = (reaccion: string) => {
        const emojiKey = Object.keys(Emogis).find(key => Emogis[key as unknown as EmogisKey]?.significado === reaccion);
        return emojiKey ? Emogis[emojiKey as unknown as EmogisKey]?.emo : reaccion;
    };

    return (
        <div className="absolute left-0 transform mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex space-x-2">
            {emojis.map((emogi) => (
                <span
                    key={emogi.id}
                    onClick={() => onEmojiClick(emogi.emogi)}
                    onMouseEnter={() => onEmojiMouseEnter(emogi.emogi)}
                    onMouseLeave={onEmojiMouseLeave}
                    className={`text-3xl cursor-pointer ${hoveredEmoji === emogi.emogi ? 'transform scale-125' : ''}`}
                >
                    {getEmoji(emogi.emogi)}
                </span>
            ))}
        </div>
    );
}

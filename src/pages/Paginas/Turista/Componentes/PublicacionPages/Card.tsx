import React, { useState } from 'react';
import Emogis from '../../../../../dictionaryEmogis/Emogis';
import { Publicacion } from './Publicaciones';
import { FaSmile } from 'react-icons/fa';

type EmogisType = typeof Emogis;
type EmogisKey = keyof EmogisType;

type CardProps = {
    publicacion: Publicacion;
    onClick: () => void;
};

const Card: React.FC<CardProps> = ({ publicacion, onClick }) => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);

    const getEmoji = (reaccion: string) => {
        const emojiKey = Object.keys(Emogis).find(key => Emogis[key as unknown as EmogisKey].significado === reaccion);
        return emojiKey ? Emogis[emojiKey as unknown as EmogisKey].emo : reaccion;
    };

    const handleEmojiClick = (emogi: string) => {
        console.log('Significado del emoji:', emogi);
        setShowEmojis(false);
    };

    const handleEmojiMouseEnter = (emogi: string) => {
        setHoveredEmoji(emogi);
        console.log('Significado del emoji:', emogi);
    };

    const handleEmojiMouseLeave = () => {
        setHoveredEmoji(null);
    };

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow relative">
            <h2 className="text-2xl font-semibold mb-2">{publicacion.tituloPost}</h2>
            <p className="text-gray-600 mb-1">Fecha de Publicación: {publicacion.fechaPublicacion}</p>
            <p className="text-gray-600 mb-1">
                Autor: {publicacion.usuario.nombre} {publicacion.usuario.apellido}
            </p>

            {/* Mostrar Imágenes */}
            {publicacion.Imagen.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Imágenes:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {publicacion.Imagen.map((imagen) => (
                            <div key={imagen.id} className="relative">
                                <img
                                    src={imagen.url}
                                    alt={imagen.tituloImg || 'Imagen'}
                                    className="w-full h-auto object-cover rounded-lg shadow-md"
                                />
                                {imagen.tituloImg && (
                                    <p className="absolute bottom-2 left-2 text-white bg-gray-800 bg-opacity-60 p-1 rounded">
                                        {imagen.tituloImg}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mostrar Comentarios */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Comentarios:</h3>
                <ul className="list-disc list-inside ml-4">
                    {publicacion.comentarios.map((comentario) => (
                        <li key={comentario.id} className="mb-2">
                            <p className="text-gray-800">{comentario.texto}</p>
                            <p className="text-gray-600">Fecha de Publicación: {comentario.fechaPublicacion}</p>
                            <p className="text-gray-600">
                                Autor: {comentario.usuario.nombre} {comentario.usuario.apellido}
                            </p>
                            <div className="flex space-x-2">
                                {comentario.reacciones.map((reaccion) => (
                                    <span key={reaccion.id}>{getEmoji(reaccion.reaccion)}</span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mostrar Reacciones */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Reacciones:</h3>
                <ul className="flex space-x-2">
                    {publicacion.reacciones.map((reaccion) => (
                        <li key={reaccion.id}>
                            <span>{getEmoji(reaccion.reaccion)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mostrar Emogis Preestablecidos para Reaccionar */}
            <div className="mt-4 relative">
                <h3 className="text-xl font-semibold mb-2">Reaccionar:</h3>
                <FaSmile
                    onClick={() => setShowEmojis(!showEmojis)}
                    className="text-3xl cursor-pointer"
                />
                {showEmojis && (
                    <div className="absolute top-0 left-0 mt-10 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex space-x-2">
                        {publicacion.emogisParaReaccionarPublicacion.map((emogi) => (
                            <span 
                                key={emogi.id}
                                onClick={() => handleEmojiClick(emogi.emogi)}
                                onMouseEnter={() => handleEmojiMouseEnter(emogi.emogi)}
                                onMouseLeave={handleEmojiMouseLeave}
                                className={`text-3xl cursor-pointer ${hoveredEmoji === emogi.emogi ? 'transform scale-125' : ''}`}
                            >
                                {getEmoji(emogi.emogi)}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import CardHeader from './Componentes/CardHeader';
import ImageGallery from './Componentes/ImageGallery';
import ReactionSection from './Componentes/ReactionSection';
import ActionButtons from './Componentes/ActionButton';
import CommentSection from './Componentes/CommentSection';
import EmojiPicker from './Componentes/EmojisPicker';
import ReactionModal from './Componentes/ReactionModal';
import CommentModal from './Componentes/CommentModal';
import { Publicacion } from './Publicaciones';
import Emogis from '../../../../../dictionaryEmogis/Emogis';

type EmogisType = typeof Emogis;
type EmogisKey = keyof EmogisType;

type CardProps = {
    publicacion: Publicacion;
    onClick: () => void;
    isDetailedView?: boolean;
};

export default function Card({ publicacion, onClick, isDetailedView = false }: CardProps) {
    const [showEmojis, setShowEmojis] = useState(false);
    const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);
    const [newComment, setNewComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const [showReactionModal, setShowReactionModal] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [showCommentModal, setShowCommentModal] = useState(false);

    if (!publicacion) {
        return <div>Loading...</div>;
    }

    const {
        tituloPost,
        fechaPublicacion,
        usuario,
        Imagen = [],
        emogisParaReaccionarPublicacion = [],
        comentarios = [],
        reacciones = []
    } = publicacion;

    const getEmoji = (reaccion: string) => {
        if (!Emogis) return reaccion;

        const emojiKey = Object.keys(Emogis).find(key => Emogis[key as unknown as EmogisKey]?.significado === reaccion);
        return emojiKey ? Emogis[emojiKey as unknown as EmogisKey]?.emo : reaccion;
    };

    const handleEmojiClick = async (emogi: string) => {
        const reaccion = emogi;
        const idPublicacion = publicacion.id;
        const idUsuario = parseInt(Cookies.get('idUsuario') || '0');

        if (!idUsuario) {
            console.error('Usuario no autenticado');
            return;
        }

        try {
            const response = await axios.post('/api/Reacciones/crearReacciones', {
                idPublicacion,
                idUsuario,
                reaccion
            });

            if (response.data.success) {
                console.log('Reacción registrada correctamente', response.data.response);
            } else {
                console.error('Error al registrar la reacción:', response.data.error);
            }
        } catch (error) {
            console.error('Error al registrar la reacción:', error);
        }

        setShowEmojis(false);
    };

    const handleEmojiMouseEnter = (emogi: string) => {
        setHoveredEmoji(emogi);
    };

    const handleEmojiMouseLeave = () => {
        setHoveredEmoji(null);
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
        setCommentError('');
    };

    const handleCommentSubmit = async () => {
        const idUsuario = parseInt(Cookies.get('idUsuario') || '0');

        if (!idUsuario) {
            console.error('Usuario no autenticado');
            return;
        }

        if (!newComment.trim()) {
            setCommentError('El comentario no puede estar vacío.');
            return;
        }

        try {
            const response = await axios.post('/api/Comentario/crearComentario', {
                idPublicacion: publicacion.id,
                idUsuario,
                texto: newComment
            });

            if (response.data.success) {
                console.log('Comentario registrado correctamente', response.data.response);
                setNewComment('');
                closeCommentModal();
            } else {
                console.error('Error al registrar el comentario:', response.data.error);
            }
        } catch (error) {
            console.error('Error al registrar el comentario:', error);
        }
    };

    const groupedReactions = reacciones.reduce((acc, reaccion) => {
        if (!reaccion || !reaccion.reaccion) return acc;
        const emoji = getEmoji(reaccion.reaccion);
        if (!acc[emoji]) {
            acc[emoji] = { count: 0, usuarios: [] };
        }
        acc[emoji].count++;
        acc[emoji].usuarios.push(`${reaccion.usuario?.nombre || 'Desconocido'} ${reaccion.usuario?.apellido || 'Desconocido'}`);
        return acc;
    }, {} as Record<string, { count: number, usuarios: string[] }>);

    const openReactionModal = (emoji: string) => {
        setSelectedEmoji(emoji);
        setShowReactionModal(true);
    };

    const closeReactionModal = () => {
        setShowReactionModal(false);
        setSelectedEmoji(null);
    };

    const openCommentModal = () => {
        setShowCommentModal(true);
    };

    const closeCommentModal = () => {
        setShowCommentModal(false);
    };

    return (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow overflow-auto">
            <CardHeader
                tituloPost={tituloPost}
                fechaPublicacion={fechaPublicacion}
                autor={usuario}
            />

            <ImageGallery images={Imagen} onClick={onClick} />

            <ReactionSection
                groupedReactions={groupedReactions}
                openReactionModal={openReactionModal}
            />

            <div className="relative">
                <ActionButtons
                    onReactionClick={() => setShowEmojis(!showEmojis)}
                    onCommentClick={openCommentModal}
                />
                {showEmojis && (
                    <div className="absolute bottom-12 left-0">
                        <EmojiPicker
                            emojis={emogisParaReaccionarPublicacion}
                            onEmojiClick={handleEmojiClick}
                            hoveredEmoji={hoveredEmoji}
                            onEmojiMouseEnter={handleEmojiMouseEnter}
                            onEmojiMouseLeave={handleEmojiMouseLeave}
                        />
                    </div>
                )}
            </div>

            {isDetailedView && <CommentSection comments={comentarios} />}

            <ReactionModal
                show={showReactionModal}
                onClose={closeReactionModal}
                selectedEmoji={selectedEmoji}
                users={groupedReactions[selectedEmoji || '']?.usuarios || []}
            />

            <CommentModal
                show={showCommentModal}
                onClose={closeCommentModal}
                newComment={newComment}
                onCommentChange={handleCommentChange}
                onCommentSubmit={handleCommentSubmit}
                commentError={commentError}
            />
        </div>
    );
}

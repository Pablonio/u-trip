import React, { useState, FormEvent, ChangeEvent } from 'react';
import Emogis from '../../../../dictionaryEmogis/Emogis';
import axios from 'axios';

type EmogiType = {
    emo: string;
    significado: string;
};

function formatSignificado(significado: string) {
    return significado
        .replace(/-/g, ' ')         // Reemplaza guiones con espacios
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza la primera letra de cada palabra
}

export default function Publicacion() {
    const [formData, setFormData] = useState<{
        tituloPost: string;
        emogisParaReaccionar: string[];
    }>({
        tituloPost: '',
        emogisParaReaccionar: []
    });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleEmogiChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (value) {
            setFormData((prev) => ({
                ...prev,
                emogisParaReaccionar: [...prev.emogisParaReaccionar, value]
            }));
        }
    };

    const handleRemoveEmogi = (emogiId: string) => {
        setFormData((prev) => ({
            ...prev,
            emogisParaReaccionar: prev.emogisParaReaccionar.filter(id => id !== emogiId)
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Publicacion:', formData);

        try {
            const responsePublicacion = await axios.post('/api/Publicacion/crearPublicacion', {
                idUsuario: 1,
                tituloPost: formData.tituloPost
            });
            console.log('Respuesta:', responsePublicacion.data);
            const idPublicacion = responsePublicacion.data.response.id;

            for (const emogiId of formData.emogisParaReaccionar) {
                const emogi = Emogis[emogiId as unknown as keyof typeof Emogis] as EmogiType;

                // Enviar nombre del emoji a la API de Emogis
                const responseEmogi = await axios.post('/api/Emogis/crearEmogis', {
                    idPublicacion: idPublicacion,
                    emogiNombre: emogi.significado // Aquí se envía el nombre del emoji
                });
                console.log('Respuesta:', responseEmogi.data);
                const idEmogi = responseEmogi.data.response.id;

                // Enviar nombre del emoji a la API de EmogisDeComentarios
                const responseEmogiComentario = await axios.post('/api/EmogisDeComentarios/crearEmogiDeComentario', {
                    idEmogi: idEmogi,
                    emogiComentario: emogi.significado // Aquí también se envía el nombre del emoji
                });

                console.log('Respuesta:', responseEmogiComentario.data);
            }

            setMensaje('Publicación exitosa con emojis');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full h-full p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center dark:text-white">Publicación</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="tituloPost">
                            Título
                        </label>
                        <input
                            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="tituloPost"
                            type="text"
                            placeholder="Título"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="emogisParaReaccionar">
                            Emojis para reaccionar
                        </label>
                        <select
                            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="emogisParaReaccionar"
                            onChange={handleEmogiChange}
                        >
                            <option value="">Selecciona un emoji</option>
                            {Object.entries(Emogis).map(([key, emogi]) => (
                                <option key={key} value={key}>
                                    {emogi.emo} - {formatSignificado(emogi.significado)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        {formData.emogisParaReaccionar.map((emogiId) => {
                            const emogi = Emogis[emogiId as unknown as keyof typeof Emogis] as EmogiType;
                            return (
                                <div key={emogiId} className="flex items-center mb-2">
                                    <span className="mr-2">{emogi.emo}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEmogi(emogiId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Publicar
                    </button>
                </form>
                {mensaje && <p className="mt-4 text-center text-green-500">{mensaje}</p>}
            </div>
        </div>
    );
}

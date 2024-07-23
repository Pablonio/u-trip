import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

export default function Publicacion() {
    const [formData, setFormData] = useState({
        tituloPost: '',
        emogisParaReaccionar: ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Publicacion:', formData);

        // Codificar emojis
        const encodedEmogis = encodeURIComponent(formData.emogisParaReaccionar);

        try {
            // Crear publicación
            const responsePublicacion = await axios.post('/api/Publicacion/crearPublicacion', {
                idUsuario: 1,  // Aquí debes ajustar el ID del usuario
                tituloPost: formData.tituloPost
            });
            console.log('Respuesta:', responsePublicacion.data);
            const idPublicacion = responsePublicacion.data.response.id;

            // Crear emojis para la publicación y emojis de comentarios
            const emogis = encodedEmogis.split('').map((char) => char); // El split está por cada carácter
            for (const emogi of emogis) {
                const responseEmogi = await axios.post('/api/Emogis/crearEmogis', {
                    idPublicacion: idPublicacion,
                    emogi: emogi
                });
                console.log('Respuesta:', responseEmogi.data);
                const idEmogi = responseEmogi.data.response.id;

                const responseEmogiComentario = await axios.post('/api/EmogisDeComentarios/crearEmogiDeComentario', {
                    idEmogi: idEmogi,
                    emogiComentario: emogi
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
                <h1 className="text-2xl font-semibold mb-6 text-center dark:text-white">Publicacion</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="tituloPost">
                            Titulo
                        </label>
                        <input
                            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="tituloPost"
                            type="text"
                            placeholder="Titulo"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="emogisParaReaccionar">
                            Emojis para reaccionar
                        </label>
                        <input
                            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="emogisParaReaccionar"
                            type="text"
                            placeholder="Ej. 😀👍💬"
                            required
                            onChange={handleChange}
                        />
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

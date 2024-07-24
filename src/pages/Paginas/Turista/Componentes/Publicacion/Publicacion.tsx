import React, { useState, FormEvent, ChangeEvent } from 'react';
import Emogis from '../../../../../dictionaryEmogis/Emogis';
import axios from 'axios';
import MapaModal from '../MapaModalUbicacion';
import { FaMapMarkerAlt, FaSmile, FaImage, FaTimes } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import Cookie from 'js-cookie';
import toast , { Toaster } from 'react-hot-toast';

type EmogiType = {
    emo: string;
    significado: string;
};

type ImagenType = {
    file: File;
    url: string;
    tituloImg: string;
};


export default function Publicacion() {
    const [formData, setFormData] = useState<{
        tituloPost: string;
        emogisParaReaccionar: string[];
        imagenes: ImagenType[];
        ubicacion: {
            latitud: string;
            longitud: string;
            calle: string;
            barrio: string;
            ciudad: string;
            provincia: string;
            Departamento: string;
            pais: string;
        } | null;
    }>({
        tituloPost: '',
        emogisParaReaccionar: [],
        imagenes: [],
        ubicacion: null,
    });

    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleEmojiClick = (emojiId: string) => {
        if (!formData.emogisParaReaccionar.includes(emojiId)) {
            setFormData(prev => ({
                ...prev,
                emogisParaReaccionar: [...prev.emogisParaReaccionar, emojiId]
            }));
        }
        setShowEmojiPicker(false);
    };

    const handleImageTitleEdit = (index: number) => {
        setEditingImageIndex(index);
    };

    const handleImageTitleSave = (index: number, title: string) => {
        handleImageTitleChange(index, title);
        setEditingImageIndex(null);
    };


    const handleRemoveEmogi = (emogiId: string) => {
        setFormData(prev => ({
            ...prev,
            emogisParaReaccionar: prev.emogisParaReaccionar.filter(id => id !== emogiId)
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imagenes = files.map(file => ({
                file,
                url: URL.createObjectURL(file),
                tituloImg: ''
            }));
            setFormData(prev => ({
                ...prev,
                imagenes: [...prev.imagenes, ...imagenes]
            }));
        }
    };

    const handleImageTitleChange = (index: number, tituloImg: string) => {
        setFormData(prev => {
            const imagenes = [...prev.imagenes];
            imagenes[index].tituloImg = tituloImg;
            return { ...prev, imagenes };
        });
    };

    const handleRemoveImage = (index: number) => {
        setFormData(prev => {
            const imagenes = [...prev.imagenes];
            imagenes.splice(index, 1);
            return { ...prev, imagenes };
        });
    };

    const handleLocationSelect = (ubicacion: {
        latitud: string;
        longitud: string;
        calle: string;
        barrio: string;
        ciudad: string;
        provincia: string;
        Departamento: string;
        pais: string;
    }) => {
        setFormData(prev => ({ ...prev, ubicacion }));
        setMapModalOpen(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Publicacion:', formData);
        const id = Cookie.get('idUsuario');
        const idUser = id ? parseInt(id, 10) : null;
        if(Cookie.get('rol') === 'TURISTA'){
            try {
                const responsePublicacion = await axios.post('/api/Publicacion/crearPublicacion', {
                    idUsuario: idUser,
                    tituloPost: formData.tituloPost
                });

                const idPublicacion = responsePublicacion.data.response.id;

                for (const emogiId of formData.emogisParaReaccionar) {
                    const emogi = Emogis[emogiId as unknown as keyof typeof Emogis] as EmogiType;

                    const responseEmogi = await axios.post('/api/Emogis/crearEmogis', {
                        idPublicacion: idPublicacion,
                        emogiNombre: emogi.significado
                    });

                    const idEmogi = responseEmogi.data.response.id;

                    await axios.post('/api/EmogisDeComentarios/crearEmogiDeComentario', {
                        idEmogi: idEmogi,
                        emogiComentario: emogi.significado
                    });
                }

                for (const imagen of formData.imagenes) {
                    const formDataImg = new FormData();
                    formDataImg.append('file', imagen.file);
                    formDataImg.append('tituloImg', imagen.tituloImg);
                    formDataImg.append('idPublicacion', idPublicacion);

                    await axios.post('/api/Imagen/crearImagenes', formDataImg, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                }

                if (formData.ubicacion) {
                    await axios.post('/api/LugarTuristico/crearLugar', {
                        idPublicacion,
                        ...formData.ubicacion
                    });
                }

                toast.success('Publicacion Hecha');
                setFormData({
                    tituloPost: '',
                    emogisParaReaccionar: [],
                    imagenes: [],
                    ubicacion: null,
                });
            } catch (error) {
                console.error('Error al crear la publicación:', error);
                toast.error('Error al crear la publicación');
            }
        }
        else{
            toast.error('No tienes permisos para crear una publicación');
        }
    };
    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Crear Publicación</h1>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 space-y-6">
                    <input
                        id="tituloPost"
                        type="text"
                        value={formData.tituloPost}
                        onChange={handleChange}
                        placeholder="¿Qué estás pensando?"
                        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => setMapModalOpen(true)}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <FaMapMarkerAlt className="text-xl" />
                            <span>Ubicación</span>
                        </button>
                        <div className="flex space-x-4">
                            <button 
                                type="button" 
                                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <FaSmile className="text-2xl" />
                            </button>
                            <label className="cursor-pointer text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                <FaImage className="text-2xl" />
                                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>
                    
                    {showEmojiPicker && (
                        <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg max-h-60 overflow-y-auto">
                            {Object.entries(Emogis).map(([id, { emo }]) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => handleEmojiClick(id)}
                                    className="text-2xl hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded"
                                >
                                    {emo}
                                </button>
                            ))}
                        </div>
                    )}

                    
                    {formData.emogisParaReaccionar.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {formData.emogisParaReaccionar.map(id => {
                                const emogi = Emogis[id as unknown as keyof typeof Emogis] as EmogiType;
                                return (
                                    <div key={id} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                                        <span className="text-2xl mr-2">{emogi?.emo}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEmogi(id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    
                    {formData.imagenes.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {formData.imagenes.map((imagen, index) => (
                                <div key={index} className="relative">
                                    <img src={imagen.url} alt={`Imagen ${index}`} className="w-full h-48 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <FaTimes />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleImageTitleEdit(index)}
                                        className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                                    >
                                        <IoMdAdd />
                                    </button>
                                    {editingImageIndex === index && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <input
                                                type="text"
                                                value={imagen.tituloImg}
                                                onChange={(e) => handleImageTitleChange(index, e.target.value)}
                                                onBlur={() => handleImageTitleSave(index, imagen.tituloImg)}
                                                className="w-3/4 p-2 rounded"
                                                placeholder="Título de la imagen"
                                                autoFocus
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Crear Publicación
                    </button>
                </div>
            </form>
            <Toaster />
            <MapaModal 
                show={mapModalOpen} 
                onClose={() => setMapModalOpen(false)} 
                onLocationSelect={handleLocationSelect} 
            />
        </div>
    );
}

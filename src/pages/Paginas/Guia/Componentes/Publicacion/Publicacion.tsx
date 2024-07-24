import React, { useState, FormEvent, ChangeEvent } from 'react';
import Emogis from '../../../../../dictionaryEmogis/Emogis';
import axios from 'axios';
import Modal from '../Modal';
import MapaModal from '../MapaModalUbicacion';
import { FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import Cookie from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

type EmogiType = {
    emo: string;
    significado: string;
};

type ImagenType = {
    file: File;
    url: string;
    tituloImg: string;
};

type PaqueteType = {
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
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
        paquete: PaqueteType[];
    }>({
        tituloPost: '',
        emogisParaReaccionar: [],
        imagenes: [],
        ubicacion: null,
        paquete: [],
    });

    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
    const [isPackageModalOpen, setPackageModalOpen] = useState(false);
    const [packageData, setPackageData] = useState<PaqueteType>({
        nombre: '',
        fechaInicio: '',
        fechaFin: ''
    });

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

    const handlePackageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPackageData(prev => ({ ...prev, [id]: value }));
    };

    const handlePackageSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, paquete: [...prev.paquete, packageData] }));
        setPackageModalOpen(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Publicacion:', formData);
        const id = Cookie.get('idUsuario');
        const idUser = id ? parseInt(id, 10) : null;
        if (Cookie.get('rol') === 'GUIA') {
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

                if (formData.paquete.length > 0) {
                    for (const paquete of formData.paquete) {
                        await axios.post('/api/Paquete/crearPaquete', {
                            idPublicacion,
                            ...paquete
                        });
                    }
                }

                toast.success('Publicacion Hecha');
                setFormData({
                    tituloPost: '',
                    emogisParaReaccionar: [],
                    imagenes: [],
                    ubicacion: null,
                    paquete: [],
                });
            } catch (error) {
                console.error('Error al crear la publicación:', error);
                toast.error('Error al crear la publicación');
            }
        } else {
            toast.error('No tienes permisos para crear una publicación');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Crear Publicación</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="tituloPost" className="block text-gray-700 dark:text-gray-200">Título:</label>
                    <input
                        id="tituloPost"
                        type="text"
                        value={formData.tituloPost}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(prev => !prev)}
                        className="inline-flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <FaSmile />
                        <span>Agregar Emogi</span>
                    </button>
                    {showEmojiPicker && (
                        <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg max-h-60 overflow-y-auto">
                            {Object.entries(Emogis).map(([id, { emo }]) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => handleEmojiClick(id)}
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    <span className="text-xl">{emo}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Imagenes:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="block w-full text-gray-700 dark:text-gray-200"
                    />
                    <div className="mt-2 flex flex-wrap gap-4">
                        {formData.imagenes.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img.url} alt={img.tituloImg} className="w-32 h-32 object-cover rounded-md border border-gray-300" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                >
                                    &times;
                                </button>
                                {editingImageIndex === index ? (
                                    <input
                                        type="text"
                                        value={img.tituloImg}
                                        onChange={(e) => handleImageTitleChange(index, e.target.value)}
                                        onBlur={() => handleImageTitleSave(index, img.tituloImg)}
                                        className="absolute bottom-0 left-0 w-full border border-gray-300 p-1 bg-white dark:bg-gray-800"
                                    />
                                ) : (
                                    <div
                                        onClick={() => handleImageTitleEdit(index)}
                                        className="absolute bottom-0 left-0 w-full bg-gray-800 text-white text-center p-1 cursor-pointer"
                                    >
                                        {img.tituloImg || 'Agregar título'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => setMapModalOpen(true)}
                        className="inline-flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <FaMapMarkerAlt />
                        <span>Agregar Ubicación</span>
                    </button>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => setPackageModalOpen(true)}
                        className="inline-flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <IoMdAdd />
                        <span>Agregar Paquete</span>
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 border border-gray-300 rounded-md px-4 py-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-white hover:bg-blue-600 dark:hover:bg-blue-700"
                >
                    <span>Guardar Publicación</span>
                </button>
            </form>

            {mapModalOpen && (
                <Modal onClose={() => setMapModalOpen(false)}>
                    <MapaModal 
                        show={mapModalOpen} 
                        onClose={() => setMapModalOpen(false)} 
                        onLocationSelect={handleLocationSelect} 
                    />
                </Modal>
            )}

            {isPackageModalOpen && (
                <Modal onClose={() => setPackageModalOpen(false)}>
                    <form onSubmit={handlePackageSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nombre" className="block text-gray-700 dark:text-gray-200">Nombre del Paquete:</label>
                            <input
                                id="nombre"
                                type="text"
                                value={packageData.nombre}
                                onChange={handlePackageChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="fechaInicio" className="block text-gray-700 dark:text-gray-200">Fecha de Inicio:</label>
                            <input
                                id="fechaInicio"
                                type="date"
                                value={packageData.fechaInicio}
                                onChange={handlePackageChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="fechaFin" className="block text-gray-700 dark:text-gray-200">Fecha de Fin:</label>
                            <input
                                id="fechaFin"
                                type="date"
                                value={packageData.fechaFin}
                                onChange={handlePackageChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center space-x-2 border border-gray-300 rounded-md px-4 py-2 bg-green-500 text-white dark:bg-green-600 dark:text-white hover:bg-green-600 dark:hover:bg-green-700"
                        >
                            <span>Guardar Paquete</span>
                        </button>
                    </form>
                </Modal>
            )}

            <Toaster />
        </div>
    );
}

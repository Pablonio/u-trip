import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type ImageType = {
    id: number;
    url: string;
    tituloImg?: string;
};

type ImageGalleryProps = {
    images: ImageType[];
    onClick: () => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Cambiar imagen cada 4 segundos

        // Limpiar intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [images.length]);

    if (images.length === 0) return null;

    // Función para avanzar a la siguiente imagen
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Función para retroceder a la imagen anterior
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Tamaño fijo para el contenedor de la imagen
    const containerSize = { width: 800, height: 600 }; // Ajusta según tus necesidades

    return (
        <div className="relative mt-4">
            <h3 className="text-xl font-semibold mb-2">Imágenes:</h3>
            {images.length > 1 ? (
                // Slider con imágenes si hay más de una
                <div className="relative overflow-hidden" style={{ width: containerSize.width }}>
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            width: `${images.length * 100}%`, // Ancho total del slider
                        }}
                    >
                        {images.map((imagen) => (
                            <div
                                key={imagen.id}
                                className="flex-shrink-0"
                                style={{
                                    width: `${100 / images.length}%`, // Ancho de cada imagen
                                    height: containerSize.height, // Altura fija del contenedor
                                }}
                            >
                                <div
                                    className="relative w-full h-full bg-gray-200 flex items-center justify-center"
                                    style={{ backgroundColor: 'gray' }}
                                >
                                    <Image
                                        src={imagen.url}
                                        alt={imagen.tituloImg || 'Imagen'}
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-lg shadow-md cursor-pointer"
                                        onClick={onClick}
                                    />
                                    {imagen.tituloImg && (
                                        <p className="absolute bottom-2 left-2 text-white bg-gray-800 bg-opacity-60 p-1 rounded">
                                            {imagen.tituloImg}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Botones de navegación */}
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                    >
                        &gt;
                    </button>
                </div>
            ) : (
                // Renderizar una sola imagen si solo hay una
                <div className="relative" style={{ width: containerSize.width, height: containerSize.height }}>
                    <div
                        className="relative w-full h-full bg-gray-200 flex items-center justify-center"
                        style={{ backgroundColor: 'gray' }}
                    >
                        <Image
                            src={images[0].url}
                            alt={images[0].tituloImg || 'Imagen'}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg shadow-md cursor-pointer"
                            onClick={onClick}
                        />
                        {images[0].tituloImg && (
                            <p className="absolute bottom-2 left-2 text-white bg-gray-800 bg-opacity-60 p-1 rounded">
                                {images[0].tituloImg}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;


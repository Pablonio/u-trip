import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type ImageType = {
    id: number;
    url: string;
    tituloImg?: string;
};

type ImageGalleryProps = {
    images?: ImageType[];  // Hacer images opcional
    onClick: () => void;
};

export default function ImageGallery({ images = [], onClick }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length > 1) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 4000); // Cambiar imagen cada 4 segundos

            // Limpiar intervalo cuando el componente se desmonte
            return () => clearInterval(intervalId);
        }
    }, [images.length]);

    if (images.length === 0) return null;

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const containerSize = { width: 800, height: 600 }; // Ajusta según tus necesidades

    return (
        <div className="relative mt-4">
            <h3 className="text-xl font-semibold mb-2">Imágenes:</h3>
            {images.length > 1 ? (
                <div className="relative overflow-hidden" style={{ width: containerSize.width }}>
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            width: `${images.length * 100}%`,
                        }}
                    >
                        {images.map((imagen) => (
                            <div
                                key={imagen.id}
                                className="flex-shrink-0"
                                style={{
                                    width: `${100 / images.length}%`,
                                    height: containerSize.height,
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
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                        aria-label="Imagen anterior"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                        aria-label="Imagen siguiente"
                    >
                        &gt;
                    </button>
                </div>
            ) : (
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
}

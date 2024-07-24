import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// Define types for props
interface MapaModalProps {
    show: boolean;
    onClose: () => void;
    onLocationSelect: (ubicacion: {
        latitud: string;
        longitud: string;
        calle: string;
        barrio: string;
        ciudad: string;
        provincia: string;
        Departamento: string;
        pais: string;
    }) => void;
}

// Define type for the position
interface Position {
    lat: number;
    lng: number;
}

export default function MapaModal({ show, onClose, onLocationSelect }: MapaModalProps) {
    const [map, setMap] = useState<any>(null);
    const [userMarker, setUserMarker] = useState<any>(null);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [mapKey, setMapKey] = useState<number>(0);

    useEffect(() => {
        if (show) {
            setMapKey(prevKey => prevKey + 1);
        }
    }, [show]);

    useEffect(() => {
        if (show && typeof window !== 'undefined' && mapKey !== 0) {
            // Import Leaflet dynamically
            import('leaflet').then(L => {
                if (!map) {
                    const newMap = L.map('map').setView([51.503, -0.09], 19);
                    setMap(newMap);

                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    }).addTo(newMap);

                    const markerIcon = L.icon({
                        iconUrl: './marker.webp',
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -30],
                    });

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            const { latitude, longitude } = position.coords;
                            const userLatLng = L.latLng(latitude, longitude);
                            newMap.setView(userLatLng, 19);
                            setSelectedPosition({ lat: latitude, lng: longitude });
                            const marker = L.marker(userLatLng, { icon: markerIcon, draggable: true }).addTo(newMap);
                            setUserMarker(marker);

                            marker.on('dragend', (event: L.LeafletEvent) => {
                                const marker = event.target as L.Marker;
                                const position = marker.getLatLng();
                                setSelectedPosition({ lat: position.lat, lng: position.lng });
                            });
                        });
                    }
                }
            }).catch(error => {
                console.error('Error loading Leaflet:', error);
            });
        }
    }, [show, mapKey, map]);

    const handleSave = async () => {
        if (selectedPosition) {
            try {
                const response = await axios.get(
                    `https://us1.locationiq.com/v1/reverse?key=pk.2914d8bbdd858dafbde7131dd6db95d4&lat=${selectedPosition.lat}&lon=${selectedPosition.lng}&format=json`
                );

                const { lat, lon, address: { road, neighbourhood, city, county, state, country } } = response.data;
                const mapeado = {
                    latitud: lat.toString(),
                    longitud: lon.toString(),
                    calle: road || '',
                    barrio: neighbourhood || '',
                    ciudad: city || '',
                    provincia: county || '',
                    Departamento: state || '',
                    pais: country || '',
                };

                console.log('Datos que se enviarán al servidor:', mapeado);
                localStorage.setItem('Mapeado', JSON.stringify(mapeado));

                onLocationSelect(mapeado);
                onClose();
            } catch (error) {
                console.error('Error al obtener la dirección o guardar la ubicación:', error);
            }
        } else {
            console.log('No se ha seleccionado ninguna posición.');
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative max-w-4xl mx-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t-lg">
                        <h3 className="text-lg font-semibold text-gray-900">Selecciona tu ubicación</h3>
                        <button
                            className="bg-transparent border-none text-black text-xl font-semibold focus:outline-none"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-6 flex-1">
                        <div id="map" key={mapKey} className="h-96"></div>
                    </div>
                    <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b-lg">
                        <button
                            className="px-4 py-2 text-sm font-bold uppercase text-red-500 bg-transparent border-none focus:outline-none transition-opacity duration-150 ease-in-out hover:opacity-80"
                            type="button"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                        <button
                            className="px-4 py-2 text-sm font-bold uppercase text-teal-500 bg-transparent border-none focus:outline-none transition-opacity duration-150 ease-in-out hover:opacity-80 ml-2"
                            type="button"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


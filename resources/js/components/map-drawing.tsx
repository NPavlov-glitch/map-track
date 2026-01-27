// resources/js/components/map-drawing.tsx (Fixed Conceptual Version)
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { useEffect, useState } from 'react';
import '@geoman-io/leaflet-geoman-free';
import L from 'leaflet';

export function MapDrawing({ onRouteUpdate }: { onRouteUpdate: (path: any[]) => void }) {
    // SSR Check
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const MapEvents = () => {
        const map = useMap(); // useMap instead of useMapEvents for getting the map instance

        useEffect(() => {
            if (!map) {
                return;
            }

            // Enable Geoman drawing tools
            map.pm.addControls({
                position: 'topleft',
                drawCircle: true,
                drawMarker: true,
                drawRectangle: true,
                drawPolygon: true,
                drawText: true,
            });

            const updateCoords = (layer: any) => {
                const coordinates = layer.getLatLngs();
                const convertedCoordinates = coordinates.map((coordinate: any) => ({lat: coordinate.lat, lng: coordinate.lng}));
                onRouteUpdate(convertedCoordinates);
            }

            // Listen for when a line is finished drawing
            map.on('pm:create', (e: any) => {
                const layer = e.layer;
                updateCoords(layer);

                layer.on('pm:edit', () => updateCoords(layer));
                layer.on('pm:remove', () => onRouteUpdate([]));
            });

            return () => {
                map.off('pm:create');
                if (map.pm) map.pm.removeControls();
            };
        }, [map]);

        return null;
    };

    if (!mounted) return null;

    const position: [number, number] = [43.2167, 27.9167];

    return (
        <div className="w-full h-full">
            <MapContainer
                center={position}
                zoom={17}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

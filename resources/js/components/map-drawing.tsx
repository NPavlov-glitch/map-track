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

            // Listen for when a line is finished drawing
            map.on('pm:create', (e: any) => {
                if (e.shape === 'Line') {
                    const coordinates = e.layer.getLatLngs();
                    // Send coordinates back to the Inertia form
                    onRouteUpdate(coordinates);
                }
            });

            return () => {
                map.off('pm:create');
                if (map.pm) map.pm.removeControls();
            };
        }, [map]);

        return null;
    };

    if (!mounted) return null;

    const position: [number, number] = [51.505, -0.09];

    return (
        <div className="">
            <MapContainer
                center={position}
                zoom={13}
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

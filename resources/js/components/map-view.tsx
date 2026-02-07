import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

interface MapViewProps {
    route: { lat: number; lng: number }[];
}

export function MapView({ route }: MapViewProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    if (!mounted || !route || route.length === 0) {
        return (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                No route data available
            </div>
        )
    }

    const center: [number, number] = [route[0].lat, route[0].lng];

    const MapAutoFit = () => {
        const map = useMap()
        useEffect(() => {
            if (route.length > 0) {
                const bounds = L.latLngBounds(route.map(r => [r.lat, r.lng]));
                map.fitBounds(bounds, { padding: [20, 20] });
            }
        }, [map, route]);
        return null;
    };

    return (
        <div className="w-full h-full rounded-md overflow-hidden border">
            <MapContainer
                center={center}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={route.map(r => [r.lat, r.lng])} color="blue" weight={4} opacity={0.7} />
                <MapAutoFit />
            </MapContainer>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// Police station icon
const policeIcon = new L.DivIcon({
    className: "custom-icon",
    html: `<div style="background: white; border: 2px solid #1e3a8a; border-radius: 50%; width: 32px; height: 32px; text-align: center; font-size: 20px; line-height: 30px;">👮‍♂️</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// Alert icon
const alertIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const policeStations = [
    { name: "Station A", lat: 31.5204, lng: 74.3587 },
    { name: "Station B", lat: 31.5500, lng: 74.3400 },
    { name: "Station C", lat: 31.5600, lng: 74.3700 },
];

function getNearestStation(alert, stations) {
    let minDist = Infinity;
    let nearest = null;

    stations.forEach((station) => {
        const dist = Math.sqrt(
            Math.pow(alert.lat - station.lat, 2) + Math.pow(alert.lng - station.lng, 2)
        );
        if (dist < minDist) {
            minDist = dist;
            nearest = station;
        }
    });

    return nearest;
}

export default function MapView() {
    const [alerts, setAlerts] = useState([]);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        socket.on("new-alert", async (data) => {
            console.log("📡 Received alert:", data);

            // Get nearest station
            const nearest = getNearestStation(data, policeStations);

            // Fetch route from OSRM
            const url = `https://router.project-osrm.org/route/v1/driving/${nearest.lng},${nearest.lat};${data.lng},${data.lat}?overview=full&geometries=geojson`;
            const res = await fetch(url);
            const routeData = await res.json();

            const coords = routeData.routes[0]?.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

            // Add alert + route
            setAlerts(prev => [...prev, { ...data, nearest }]);
            setRoutes(prev => [...prev, coords || []]);
        });

        return () => socket.off("new-alert");
    }, []);

    return (
        <>
            <div style={{ padding: "1rem", textAlign: "center", fontWeight: "bold" }}>
                {alerts.length > 0 && (
                    <span style={{ backgroundColor: "#fef9c3", padding: "8px", borderRadius: "5px" }}>
                        🚨 {alerts.length} Alert{alerts.length > 1 ? 's' : ''} routed to nearest stations.
                    </span>
                )}
            </div>
            <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
                <MapContainer center={[31.54, 74.35]} zoom={12} style={{ height: "350px", width: "45%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Police Markers */}
                    {policeStations.map((station, index) => (
                        <Marker key={`station-${index}`} position={[station.lat, station.lng]} icon={policeIcon}>
                            <Popup>🚓 {station.name}</Popup>
                        </Marker>
                    ))}

                    {/* Alert Markers + Polylines */}
                    {alerts.map((alert, index) => (
                        <React.Fragment key={`alert-${index}`}>
                            <Marker position={[alert.lat, alert.lng]} icon={alertIcon}>
                                <Popup>
                                    ⚠️ Alert #{alert.id}<br />
                                    Nearest: {alert.nearest.name}
                                </Popup>
                            </Marker>

                            {routes[index]?.length > 0 && (
                                <Polyline positions={routes[index]} pathOptions={{ color: "red", weight: 4 }} />
                            )}
                        </React.Fragment>
                    ))}
                </MapContainer>
            </div>
        </>
    );
}

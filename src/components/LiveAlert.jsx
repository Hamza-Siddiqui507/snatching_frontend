import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://snatching-frontend.vercel.app/');

export default function LiveAlert() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        socket.on('new-alert', (data) => {
            console.log("🔴 Received alert from backend:", data);
            setAlerts(prev => [...prev, data]); // Add to local state
        });

        return () => socket.off('new-alert'); // Clean up
    }, []);

    return (
        <div>
            <h2>Live Alerts</h2>
            {alerts.map((alert, index) => (
                <div key={index}>
                    Alert #{index + 1}: Lat: {alert.lat}, Lng: {alert.lng}
                </div>
            ))}
        </div>
    );
}

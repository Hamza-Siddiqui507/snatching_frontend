import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from "@mui/material";

const dummyAlerts = [
    { id: 1, station: "Station A", time: "10:15 AM", lat: 31.52, lng: 74.34, status: "Routed" },
    { id: 2, station: "Station B", time: "10:17 AM", lat: 31.53, lng: 74.31, status: "Pending" },
];

export default function AlertTable() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ bgcolor: "#e3f2fd" }}>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Station</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                            <TableCell>{alert.id}</TableCell>
                            <TableCell>{alert.station}</TableCell>
                            <TableCell>{alert.time}</TableCell>
                            <TableCell>{alert.lat.toFixed(3)}, {alert.lng.toFixed(3)}</TableCell>
                            <TableCell>{alert.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

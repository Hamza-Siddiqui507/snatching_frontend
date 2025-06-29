import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import LiveAlert from "../components/LiveAlert";
import AlertTable from "../components/AlertTable";
import MapView from "../components/MapView";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <Box display="flex">
                {/* Sidebar */}
                {/* <Sidebar /> */}

                {/* Main content */}
                <Box flex={1} p={2}>
                    <LiveAlert />

                    <Box my={2}>
                        <MapView />
                    </Box>

                    <AlertTable />
                </Box>
            </Box>
        </>
    );
}

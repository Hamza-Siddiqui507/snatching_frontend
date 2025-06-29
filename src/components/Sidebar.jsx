import React from "react";
import { Drawer, List, ListItem, ListItemText, Typography, Box } from "@mui/material";

export default function Sidebar() {
    return (
        <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
            <Box sx={{ width: 240, bgcolor: "#1976d2", height: "100vh", color: "white", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    🚨 Snatching Watch
                </Typography>
                <List>
                    <ListItem button>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Alerts" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Police Stations" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

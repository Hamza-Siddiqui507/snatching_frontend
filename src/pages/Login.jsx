import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                required
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, registerForEvent } from '../redux/slices/eventSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Paper, Alert, Container, Grid, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { event, loading, error } = useSelector((state) => state.events);
    const { user } = useSelector((state) => state.auth);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        dispatch(fetchEventById(id));
    }, [dispatch, id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        const resultAction = await dispatch(registerForEvent(id));
        if (registerForEvent.fulfilled.match(resultAction)) {
            setMsg({ type: 'success', text: resultAction.payload.message });
        } else {
            setMsg({ type: 'error', text: resultAction.payload?.message || 'Error registering' });
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!event) return null;

    return (
        <Box>
            {/* Hero Banner */}
            <Box
                sx={{
                    width: '100%',
                    height: '50vh',
                    position: 'relative',
                    backgroundImage: `url(${event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1500&q=80'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: -8
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))'
                }} />
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
                <Paper
                    sx={{
                        p: 6,
                        borderRadius: 6,
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        mb: 8,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                    }}
                >
                    {msg && <Alert severity={msg.type} sx={{ mb: 4, borderRadius: 3 }}>{msg.text}</Alert>}

                    <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
                        Event Details
                    </Typography>

                    <Typography variant="h2" sx={{ my: 2, fontWeight: 700 }}>
                        {event.title}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                        <Chip icon={<CalendarMonthIcon />} label={new Date(event.date).toLocaleDateString()} variant="outlined" sx={{ borderRadius: 2 }} />
                        <Chip icon={<LocationOnIcon />} label={event.location} variant="outlined" sx={{ borderRadius: 2 }} />
                        <Chip label={`Capacity: ${event.capacity}`} color={event.capacity > 0 ? 'default' : 'error'} sx={{ borderRadius: 2 }} />
                    </Box>

                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>About this event</Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#333' }}>
                        {event.description}
                    </Typography>

                    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">Interested?</Typography>
                            <Typography variant="h6">{event.waitlist_count} people on waitlist</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleRegister}
                            sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 100 }}
                        >
                            Register Now
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default EventDetails;

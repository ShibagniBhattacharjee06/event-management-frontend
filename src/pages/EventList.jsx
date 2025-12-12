import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/slices/eventSlice';
import { Grid, Card, CardContent, CardMedia, Typography, Pagination, Box, Container, Fade } from '@mui/material';
import { Link } from 'react-router-dom';

const EventList = () => {
    const dispatch = useDispatch();
    const { events, totalPages, currentPage, loading, error } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEvents({ page: 1 }));
    }, [dispatch]);

    const handlePageChange = (event, value) => {
        dispatch(fetchEvents({ page: value }));
    };

    const HeroSection = () => (
        <Box
            sx={{
                py: 8,
                pb: 12,
                backgroundImage: 'linear-gradient(135deg, #007AFF10 0%, #FFFFFF 100%)',
                borderRadius: 4,
                mb: 6,
                textAlign: 'center',
            }}
        >
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
                Discover Events
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
                Explore curated experiences happening around you.
            </Typography>
        </Box>
    );

    if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

    if (error) return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="error" gutterBottom>Error Loading Events</Typography>
            <Typography color="text.secondary">{error}</Typography>
        </Container>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <HeroSection />

            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Upcoming Events</Typography>

            {events.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">No events found.</Typography>
                </Box>
            )}

            <Grid container spacing={4}>
                {events.map((event, index) => (
                    <Grid item key={event.id} xs={12} sm={6} md={4}>
                        <Fade in timeout={500 + (index * 100)}>
                            <Card
                                component={Link}
                                to={`/events/${event.id}`}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    cursor: 'pointer'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="220"
                                    image={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'}
                                    alt={event.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                                        {event.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {new Date(event.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {event.location}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {event.description.substring(0, 100)}...
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} size="large" />
            </Box>
        </Container>
    );
};

export default EventList;

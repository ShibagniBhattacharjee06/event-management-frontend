import React from 'react';
import { Box, Container, Typography, Grid, useTheme, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PremiumEventCard from '../components/PremiumEventCard';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { demoEvents } from '../data/demoEvents';

const LandingPage = ({ mode, toggleTheme }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            bgcolor: 'background.default',
            minHeight: '100vh',
            transition: 'background-color 0.3s ease'
        }}>
            <Navbar mode={mode} toggleTheme={toggleTheme} />

            <main>
                <div id="hero">
                    <Hero />
                </div>

                <div id="features">
                    <Features />
                </div>

                {/* Demo Events Section */}
                <Box id="events" sx={{ py: 12, background: theme.palette.background.subtle }}>
                    <Container maxWidth="lg">
                        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'primary.main', display: 'block', mb: 1 }}>
                                    Upcoming Highlights
                                </Typography>
                                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                    Curated Events
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={4}>
                            {demoEvents.slice(0, 3).map((event) => (
                                <Grid item xs={12} md={4} key={event.id}>
                                    <PremiumEventCard event={event} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Testimonials Placeholder */}
                <Box id="testimonials" sx={{ py: 12, borderTop: `1px solid ${theme.palette.divider}` }}>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
                            Loved by creators.
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            "EventOS completely transformed how we manage our design summits. Simply beautiful."
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
                            — Sarah Jenkins, DesignShift
                        </Typography>
                    </Container>
                </Box>

                {/* Pricing Placeholder */}
                <Box id="pricing" sx={{ py: 12, bgcolor: theme.palette.background.subtle }}>
                    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            Simple Pricing.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 8 }}>
                            Start for free, scale when you're ready.
                        </Typography>
                        <Grid container spacing={4} justifyContent="center">
                            {[1, 2].map((i) => (
                                <Grid item xs={12} md={5} key={i}>
                                    <Box sx={{
                                        p: 4,
                                        bgcolor: theme.palette.background.paper,
                                        borderRadius: 4,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                                    }}>
                                        <Typography variant="h4" sx={{ mb: 2 }}>{i === 1 ? 'Free' : 'Pro'}</Typography>
                                        <Typography variant="h3" sx={{ mb: 4 }}>{i === 1 ? '$0' : '$29'}</Typography>
                                        <Button variant={i === 1 ? "outlined" : "contained"} fullWidth>Choose Plan</Button>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                <div id="how-it-works">
                    <HowItWorks />
                </div>

                <CallToAction />
            </main>

            <div id="footer">
                <Footer />
            </div>
        </Box>
    );
};

export default LandingPage;

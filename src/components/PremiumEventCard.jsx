import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const PremiumEventCard = ({ event }) => {
    const theme = useTheme();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    overflow: 'visible', // For shadow spread
                    background: theme.palette.background.paper,
                    boxShadow: theme.shadows[1],
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                        boxShadow: theme.palette.mode === 'light'
                            ? '0 20px 40px rgba(0,0,0,0.1)'
                            : '0 20px 40px rgba(0,0,0,0.6)',
                    },
                    position: 'relative'
                }}
            >
                {/* Image Area with Gradient Overlay option */}
                <Box sx={{ position: 'relative', height: 240, overflow: 'hidden', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background: event.bannerStyle || 'linear-gradient(135deg, #eee 0%, #ddd 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Placeholder visual if no image provided, using bannerStyle gradient */}
                        <Typography variant="h3" sx={{ opacity: 0.1, fontWeight: 800, letterSpacing: -2 }}>
                            {new Date(event.date).getFullYear()}
                        </Typography>
                    </Box>

                    {/* Date Badge */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            padding: '6px 12px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: '#000'
                        }}
                    >
                        <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', color: '#86868b' }}>
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </Typography>
                        <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 700 }}>
                            {new Date(event.date).getDate()}
                        </Typography>
                    </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3, pt: 2 }}>
                    <Typography gutterBottom variant="caption" component="div" color="primary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {event.location}
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                        {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Experience the future of {event.title.split(' ')[0]} in a way you've never seen before.
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 'auto' }}
                        onClick={() => alert(`Reserved a spot for ${event.title}`)}
                    >
                        Reserve Spot
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default PremiumEventCard;

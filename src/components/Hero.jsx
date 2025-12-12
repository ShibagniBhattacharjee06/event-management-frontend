import React, { useState } from 'react';
import { Box, Typography, Button, Container, useTheme, useMediaQuery, Dialog, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openVideo, setOpenVideo] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Apple-like ease
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                pt: { xs: 12, md: 16 },
                pb: { xs: 8, md: 12 },
                background: theme.palette.mode === 'light'
                    ? 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F5F5F7 100%)'
                    : 'radial-gradient(circle at 50% 0%, #1C1C1E 0%, #000000 100%)',
            }}
        >
            <Container maxWidth="lg">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ textAlign: 'center', zIndex: 2, position: 'relative' }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                mb: 2,
                                background: theme.palette.mode === 'light'
                                    ? 'linear-gradient(135deg, #1D1D1F 0%, #424245 100%)'
                                    : 'linear-gradient(135deg, #FFFFFF 0%, #A1A1A6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            A new way to <br /> experience events.
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ mb: 4, fontWeight: 400, maxWidth: '600px', mx: 'auto' }}
                        >
                            Immersive, seamless, and beautifully designed. Manage your events with a platform that feels as premium as the event itself.
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 8 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => navigate('/signup')}
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="text"
                                color="primary"
                                size="large"
                                sx={{ borderRadius: '980px', padding: '10px 24px' }}
                                onClick={() => setOpenVideo(true)}
                            >
                                Watch Video
                            </Button>
                        </Box>
                    </motion.div>

                    {/* CSS-Only MacBook Mockup */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            marginTop: '2rem',
                            perspective: '1000px'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '900px',
                                aspectRatio: '16/10',
                                margin: '0 auto',
                                background: theme.palette.mode === 'light' ? '#000' : '#1C1C1E',
                                borderRadius: '24px 24px 0 0',
                                border: `12px solid ${theme.palette.mode === 'light' ? '#d1d1d6' : '#333'}`,
                                borderBottom: 'none',
                                position: 'relative',
                                boxShadow: theme.palette.mode === 'light'
                                    ? '0 50px 100px -20px rgba(0,0,0,0.1)'
                                    : '0 50px 100px -20px rgba(0,0,0,0.5)',
                                transformOrigin: 'bottom',
                                zIndex: 1
                            }}
                        >
                            {/* Screen Content - Abstract UI */}
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                background: theme.palette.mode === 'light' ? '#F5F5F7' : '#000',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex'
                            }}>
                                {/* Sidebar */}
                                <Box sx={{
                                    width: '20%',
                                    height: '100%',
                                    borderRight: `1px solid ${theme.palette.divider}`,
                                    p: 2
                                }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <Box key={i} sx={{
                                            height: 8,
                                            width: '60%',
                                            borderRadius: 4,
                                            bgcolor: theme.palette.action.selected,
                                            mb: 2
                                        }} />
                                    ))}
                                </Box>
                                {/* Main Content Area */}
                                <Box sx={{ p: 4, flex: 1 }}>
                                    <Box sx={{
                                        height: 120,
                                        width: '100%',
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                                        mb: 3,
                                        opacity: 0.8
                                    }} />
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        {[1, 2, 3].map((i) => (
                                            <Box key={i} sx={{
                                                height: 100,
                                                width: 100,
                                                borderRadius: 2,
                                                bgcolor: theme.palette.action.hover
                                            }} />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>

                            {/* Camera Notch */}
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 120,
                                height: 18,
                                background: '#1c1c1e',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                zIndex: 10
                            }} />
                        </Box>
                        {/* Laptop Bottom Deck */}
                        <Box sx={{
                            width: '110%',
                            maxWidth: '990px',
                            height: '24px',
                            background: theme.palette.mode === 'light' ? '#d1d1d6' : '#333',
                            margin: '0 auto',
                            borderRadius: '0 0 20px 20px',
                            // Gradient shadow for depth
                            backgroundImage: `linear-gradient(to bottom, 
                                ${theme.palette.mode === 'light' ? '#d1d1d6' : '#333'} 0%,
                                ${theme.palette.mode === 'light' ? '#b0b0b6' : '#222'} 100%)`,
                            position: 'relative',
                            zIndex: 2
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '120px',
                                height: '8px',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '0 0 8px 8px'
                            }} />
                        </Box>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Video Modal */}
            <Dialog
                open={openVideo}
                onClose={() => setOpenVideo(false)}
                maxWidth="lg"
                fullWidth
            >
                <Box sx={{ position: 'relative', p: 0, bgcolor: 'black', aspectRatio: '16/9' }}>
                    <IconButton
                        onClick={() => setOpenVideo(false)}
                        sx={{ position: 'absolute', top: 16, right: 16, color: 'white', zIndex: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: 'white'
                    }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                            title="Product Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default Hero;

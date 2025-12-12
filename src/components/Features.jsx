import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';

const features = [
    {
        icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
        title: 'Intelligent Design',
        description: 'Layouts that adapt to your content automatically, ensuring every event page looks professionally curated.',
        colSpan: 8,
    },
    {
        icon: <SpeedIcon sx={{ fontSize: 40 }} />,
        title: 'Blazing Fast',
        description: 'Optimized for speed.',
        colSpan: 4,
    },
    {
        icon: <SecurityIcon sx={{ fontSize: 40 }} />,
        title: 'Enterprise Security',
        description: 'Bank-grade encryption keeps your data safe.',
        colSpan: 4,
    },
    {
        icon: <DevicesIcon sx={{ fontSize: 40 }} />,
        title: 'Cross-Platform',
        description: 'Manage from your Mac, iPad, or iPhone seamlessly with our fully responsive web app.',
        colSpan: 8,
    },
];

const Features = () => {
    const theme = useTheme();

    return (
        <Box sx={{ py: 12, background: theme.palette.background.default }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                        Everything you need.<br />
                        <span style={{ color: theme.palette.text.secondary }}>Nothing you don't.</span>
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={feature.colSpan} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        minHeight: 280,
                                        borderRadius: '24px',
                                        background: theme.palette.mode === 'light' ? '#F5F5F7' : '#1C1C1E',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.02)'
                                        }
                                    }}
                                >
                                    <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                        {feature.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Features;

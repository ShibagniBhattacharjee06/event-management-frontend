import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const steps = [
    {
        num: '01',
        title: 'Create',
        desc: 'Set up your event in seconds with our intuitive dashboard.'
    },
    {
        num: '02',
        title: 'Customize',
        desc: 'Brand your event page to match your unique identity.'
    },
    {
        num: '03',
        title: 'Launch',
        desc: 'Publish instantly and start selling tickets worldwide.'
    }
];

const HowItWorks = () => {
    const theme = useTheme();

    return (
        <Box sx={{ py: 16, background: theme.palette.background.paper }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 10, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700 }}>
                        Effortless from start to finish.
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {steps.map((step, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '4rem',
                                            fontWeight: 800,
                                            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            mb: 2,
                                            opacity: 0.3
                                        }}
                                    >
                                        {step.num}
                                    </Typography>
                                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '300px' }}>
                                        {step.desc}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HowItWorks;

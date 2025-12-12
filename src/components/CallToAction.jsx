import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ py: 16, background: theme.palette.background.default }}>
            <Container maxWidth="md">
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 8,
                        borderRadius: '32px',
                        background: 'linear-gradient(135deg, #007AFF 0%, #00C7BE 100%)',
                        color: 'white',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#fff' }}>
                            Ready to get started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
                            Join thousands of creators hosting premium events today.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                background: '#fff',
                                color: '#007AFF',
                                '&:hover': {
                                    background: '#f5f5f7',
                                }
                            }}
                            onClick={() => navigate('/signup')}
                        >
                            Start Free Trial
                        </Button>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};

export default CallToAction;

import React from 'react';
import { Box, Container, Typography, useTheme, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * MarketingTemplate
 * A skeleton template for creating additional marketing pages with the same premium feel.
 */
const MarketingTemplate = ({ mode, toggleTheme }) => {
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar mode={mode} toggleTheme={toggleTheme} />

            <Box component="main" sx={{ flexGrow: 1, pt: 12 }}>
                {/* Hero Section Placeholder */}
                <Box sx={{ py: 12, textAlign: 'center' }}>
                    <Container maxWidth="md">
                        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                            Page Title
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                            A short description that summarizes the page content.
                        </Typography>
                    </Container>
                </Box>

                {/* Content Section */}
                <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography variant="body1" paragraph>
                            Content goes here. This template includes the Navbar and Footer and sets up the basic layout structure consistent with the Landing Page.
                        </Typography>
                        <Box sx={{ height: 400, bgcolor: 'action.hover', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color="text.secondary">Visual Content / Illustration</Typography>
                        </Box>
                    </Container>
                </Box>
            </Box>

            <Footer />
        </Box>
    );
};

export default MarketingTemplate;

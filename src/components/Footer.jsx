import React from 'react';
import { Box, Container, Typography, Grid, Link, useTheme } from '@mui/material';

const Footer = () => {
    const theme = useTheme();

    // Apple-style footer links structure
    const footerLinks = [
        {
            title: 'Product',
            links: ['Features', 'Integrations', 'Pricing', 'Changelog']
        },
        {
            title: 'Platform',
            links: ['For Creators', 'For Developers', 'Security', 'Status']
        },
        {
            title: 'Company',
            links: ['About', 'Careers', 'Blog', 'Contact']
        },
        {
            title: 'Legal',
            links: ['Privacy', 'Terms', 'Cookie Policy']
        }
    ];

    return (
        <Box sx={{
            py: 8,
            background: theme.palette.background.default,
            borderTop: `1px solid ${theme.palette.divider}`,
            fontSize: '12px'
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {footerLinks.map((column, idx) => (
                        <Grid item xs={6} sm={3} md={2} key={idx}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2, display: 'block' }}>
                                {column.title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {column.links.map((link) => (
                                    <Link
                                        key={link}
                                        href="#"
                                        color="text.secondary"
                                        underline="hover"
                                        sx={{ fontSize: '13px' }}
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 8, pt: 4, borderTop: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} Event Platform Inc. All rights reserved.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Designed by Antigravity
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;

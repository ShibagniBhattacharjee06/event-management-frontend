import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, useScrollTrigger, useTheme, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import Logo from './Logo';

const Navbar = ({ toggleTheme, mode }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { user, token } = useSelector((state) => state.auth);
    const isAuthenticated = !!token;

    const [scrolled, setScrolled] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleLogoClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        handleMenuClose();
    };

    const navItems = [
        { label: 'Features', id: 'features', type: 'scroll' },
        { label: 'Testimonials', id: 'testimonials', type: 'scroll' },
        { label: 'Events', path: '/events', type: 'route' },
    ];

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: scrolled
                    ? (theme.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(28,28,30,0.8)')
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
                transition: 'all 0.3s ease',
                height: 64,
                justifyContent: 'center'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                    onClick={handleLogoClick}
                >
                    <Logo size={28} />
                    <Box sx={{ fontWeight: 600, fontSize: '1.2rem', color: theme.palette.text.primary, ml: 1 }}>
                        EventOS
                    </Box>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.label}
                            color="inherit"
                            onClick={() => item.type === 'scroll' ? scrollToSection(item.id) : navigate(item.path)}
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.9rem',
                                '&:hover': { color: theme.palette.text.primary, background: 'transparent' }
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                    <Button
                        color="inherit"
                        onClick={() => scrollToSection('pricing')}
                        sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.9rem',
                            '&:hover': { color: theme.palette.text.primary, background: 'transparent' }
                        }}
                    >
                        Pricing
                    </Button>
                    {isAuthenticated && user?.role === 'admin' && (
                        <Button
                            color="inherit"
                            onClick={() => navigate('/admin')}
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.9rem',
                                '&:hover': { color: theme.palette.text.primary, background: 'transparent' }
                            }}
                        >
                            Dashboard
                        </Button>
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                        onClick={toggleTheme}
                        sx={{ color: theme.palette.text.primary, minWidth: 'auto' }}
                    >
                        {mode === 'light' ? '🌙' : '☀️'}
                    </Button>

                    {!isAuthenticated ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ display: { xs: 'none', md: 'block' } }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    ) : (
                        <>
                            <Box sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 600, fontSize: '0.9rem' }}>
                                Hi, {user?.name || 'User'}
                            </Box>
                            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32, fontSize: '0.9rem' }}>
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                    }
                                }}
                            >
                                <MenuItem onClick={() => { navigate('/events'); handleMenuClose(); }}>Browse Events</MenuItem>
                                {user?.role === 'admin' && (
                                    <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>Admin Dashboard</MenuItem>
                                )}
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { md: 'none' }, color: theme.palette.text.primary }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

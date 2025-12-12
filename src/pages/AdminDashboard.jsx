import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats, fetchUsers } from '../redux/slices/adminSlice';
import { fetchEvents, deleteEvent } from '../redux/slices/eventSlice';
import { Grid, Paper, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Container, Fade, IconButton, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { stats, users } = useSelector((state) => state.admin);
    const { events } = useSelector((state) => state.events);
    const [tabValue, setTabValue] = React.useState(0);

    useEffect(() => {
        dispatch(fetchStats());
        dispatch(fetchUsers());
        dispatch(fetchEvents({ limit: 100 })); // Fetch all for list
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleDeleteEvent = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            dispatch(deleteEvent(id));
        }
    };

    // Metric Card Component
    const MetricCard = ({ title, value }) => (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                textAlign: 'left',
                height: '100%',
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.7)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    backgroundColor: 'rgba(255,255,255, 0.9)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }
            }}
        >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-2px', color: '#1D1D1F' }}>
                {value}
            </Typography>
        </Paper>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>Overview</Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/admin/create-event"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: 100, px: 3, py: 1.2, fontSize: '1rem' }}
                >
                    New Event
                </Button>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={4} sx={{ mb: 8 }}>
                <Grid item xs={12} md={4}>
                    <Fade in timeout={500}>
                        <Box><MetricCard title="Total Users" value={stats?.totalUsers || 0} /></Box>
                    </Fade>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Fade in timeout={700}>
                        <Box><MetricCard title="Active Events" value={stats?.totalEvents || 0} /></Box>
                    </Fade>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Fade in timeout={900}>
                        <Box><MetricCard title="Total Registrations" value={stats?.totalRegistrations || 0} /></Box>
                    </Fade>
                </Grid>
            </Grid>

            {/* Tabs for Data Tables */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
                    <Tab label="Recent Users" />
                    <Tab label="Manage Events" />
                </Tabs>
            </Box>

            {/* User Table */}
            {tabValue === 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    <Table>
                        <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, py: 2 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F5F5F7' } }}>
                                    <TableCell component="th" scope="row">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell sx={{ fontFamily: 'monospace', color: '#555' }}>{user.email}</TableCell>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.8rem', fontWeight: 600,
                                                bgcolor: user.role === 'admin' ? '#E3F2FD' : '#F3F4F6',
                                                color: user.role === 'admin' ? '#1E88E5' : '#616161'
                                            }}
                                        >
                                            {user.role}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            {/* Event Management Table */}
            {tabValue === 1 && (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    <Table>
                        <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, py: 2 }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Capacity</TableCell>
                                <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F5F5F7' } }}>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{event.title}</TableCell>
                                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.capacity}</TableCell>
                                    <TableCell align="right">
                                        <IconButton component={Link} to={`/admin/edit-event/${event.id}`} color="primary" size="small">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteEvent(event.id)} color="error" size="small">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {events.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>No events found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Container>
    );
};

export default AdminDashboard;

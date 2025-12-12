import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signup } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert, Box, MenuItem, Paper, Fade } from '@mui/material';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'user'
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
            role: Yup.string().oneOf(['user', 'admin']).required('Required')
        }),
        onSubmit: (values) => {
            dispatch(signup(values));
        }
    });

    return (
        <Fade in timeout={800}>
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        width: '100%',
                        maxWidth: 450,
                        borderRadius: 6,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                        textAlign: 'center',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(40px)',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
                        Create Account
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Join us to explore exclusive events.
                    </Typography>

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="name"
                            name="name"
                            label="Full Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="email"
                            name="email"
                            label="Email Address"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            fullWidth
                            select
                            margin="normal"
                            id="role"
                            name="role"
                            label="Role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </TextField>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
                            }}
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <span
                                    style={{ color: '#007AFF', cursor: 'pointer', fontWeight: 600 }}
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <span
                                style={{ color: '#007AFF', cursor: 'pointer', fontWeight: 600 }}
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </span>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Fade>
    );
};

export default Signup;

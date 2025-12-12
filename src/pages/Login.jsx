import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert, Box, Paper, Fade } from '@mui/material';

const Login = () => {
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
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            dispatch(login(values));
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
                        maxWidth: 420,
                        borderRadius: 6,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                        textAlign: 'center',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(40px)',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Please enter your details to sign in.
                    </Typography>

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={formik.handleSubmit}>
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
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 4 }}
                        />
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
                            {loading ? 'Logging in...' : 'Sign In'}
                        </Button>
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <span
                                    style={{ color: '#007AFF', cursor: 'pointer', fontWeight: 600 }}
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Fade>
    );
};

export default Login;

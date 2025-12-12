import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createEvent, updateEvent, fetchEventById } from '../redux/slices/eventSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Fade, Grid } from '@mui/material';

const CreateEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const { event } = useSelector((state) => state.events);

    useEffect(() => {
        if (isEditMode) {
            dispatch(fetchEventById(id));
        }
    }, [dispatch, id, isEditMode]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: isEditMode && event ? event.title : '',
            description: isEditMode && event ? event.description : '',
            location: isEditMode && event ? event.location : '',
            date: isEditMode && event ? event.date : '',
            capacity: isEditMode && event ? event.capacity : 0,
            image: null
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string(),
            location: Yup.string().required('Required'),
            date: Yup.date().required('Required'),
            capacity: Yup.number().min(1, 'Capacity must be at least 1').required('Required')
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            for (let key in values) {
                // Don't send null image on update if not changed, backend should handle.
                // But simplified: append everything.
                if (key === 'image' && !values[key]) continue;
                formData.append(key, values[key]);
            }

            let resultAction;
            if (isEditMode) {
                resultAction = await dispatch(updateEvent({ id, eventData: formData }));
            } else {
                resultAction = await dispatch(createEvent(formData));
            }

            if (createEvent.fulfilled.match(resultAction) || updateEvent.fulfilled.match(resultAction)) {
                navigate('/admin');
            }
        }
    });

    return (
        <Fade in timeout={600}>
            <Container maxWidth="sm" sx={{ my: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: 6,
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(0,0,0,0.04)'
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
                        {isEditMode ? 'Edit Event' : 'Create New Event'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        {isEditMode ? 'Update event details below.' : 'Enter the details for the new event.'}
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth margin="normal"
                            name="title" label="Event Title"
                            value={formik.values.title} onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                        />
                        <TextField
                            fullWidth margin="normal" multiline rows={4}
                            name="description" label="Description"
                            value={formik.values.description} onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth margin="normal"
                            name="location" label="Location"
                            value={formik.values.location} onChange={formik.handleChange}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth margin="normal"
                                    name="date" label="Date" type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.date} onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth margin="normal"
                                    name="capacity" label="Capacity" type="number"
                                    value={formik.values.capacity} onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Box
                            sx={{
                                mt: 3, mb: 3, p: 3,
                                border: '2px dashed #E5E5EA',
                                borderRadius: 4,
                                textAlign: 'center',
                                backgroundColor: '#F9FAFB'
                            }}
                        >
                            <Button
                                variant="text"
                                component="label"
                                sx={{ width: '100%', height: '100%' }}
                            >
                                {formik.values.image ? formik.values.image.name : (isEditMode ? "Change Banner Image" : "Upload Banner Image")}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(event) => {
                                        formik.setFieldValue("image", event.currentTarget.files[0]);
                                    }}
                                />
                            </Button>
                        </Box>

                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            size="large"
                            type="submit"
                            sx={{ mt: 2, height: 50, fontSize: '1rem' }}
                        >
                            {isEditMode ? 'Update Event' : 'Create Event'}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Fade>
    );
};

export default CreateEvent;

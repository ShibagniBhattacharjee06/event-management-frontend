import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

export const fetchEvents = createAsyncThunk('events/fetchAll', async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
        const response = await axios.get(`events?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createEvent = createAsyncThunk('events/create', async (eventData, thunkAPI) => {
    try {
        // Event Data is FormData for image upload
        const response = await axios.post('events', eventData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchEventById = createAsyncThunk('events/fetchById', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`events/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const registerForEvent = createAsyncThunk('events/register', async (eventId, thunkAPI) => {
    try {
        const response = await axios.post('registrations', { eventId });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateEvent = createAsyncThunk('events/update', async ({ id, eventData }, thunkAPI) => {
    try {
        const response = await axios.put(`events/${id}`, eventData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteEvent = createAsyncThunk('events/delete', async (id, thunkAPI) => {
    try {
        await axios.delete(`events/${id}`);
        return id; // return id to remove from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        event: null,
        totalPages: 1,
        currentPage: 1,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload.events;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.events.push(action.payload); // simplified
            })
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.event = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.event = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(registerForEvent.fulfilled, (state, action) => {
                // handle success message or update event waitlist locally if needed
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(e => e.id !== action.payload);
            });
    }
});

export default eventSlice.reducer;

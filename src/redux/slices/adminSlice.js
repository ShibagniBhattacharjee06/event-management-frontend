import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

export const fetchStats = createAsyncThunk('admin/fetchStats', async (_, thunkAPI) => {
    try {
        const response = await axios.get('admin/stats');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, thunkAPI) => {
    try {
        const response = await axios.get('admin/users');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: null,
        users: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    }
});

export default adminSlice.reducer;

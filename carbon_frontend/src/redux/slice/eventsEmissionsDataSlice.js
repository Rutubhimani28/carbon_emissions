/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchEventsEmissionsData = createAsyncThunk('fetchEventsEmissionsData', async () => {
    try {
        const response = await apiget("api/eventData/events-emissions-list");
        return response?.data?.data;
    } catch (error) {
        throw error;
    }
});

const eventDataSlice = createSlice({
    name: 'eventsEmissionsDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEventsEmissionsData.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchEventsEmissionsData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = "";
        })
        builder.addCase(fetchEventsEmissionsData.rejected, (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.error.message;
        });
    },
});

export default eventDataSlice.reducer;
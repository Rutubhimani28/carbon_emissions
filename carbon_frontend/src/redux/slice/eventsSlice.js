import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchEventsData = createAsyncThunk('fetchEventsData', async (type) => {
    let response;
    switch (type) {
        case "eventVenue":
            response = await apiget(`api/events/event-venue`);
            break;
        case "eventExecutionAgency":
            response = await apiget(`api/events/event-execution-agency`);
            break;
        default:
            throw new Error(`Unknown type: ${type}`);
    }
    return response?.data?.result;
});

const eventsSlice = createSlice({
    name: 'eventsData',
    initialState: {
        data: [],
        isLoading: false,
        error: '',
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEventsData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = '';
            })
            .addCase(fetchEventsData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default eventsSlice.reducer;

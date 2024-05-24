/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchCalendarData = createAsyncThunk('fetchCalendarData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget(userRole === "admin" ? `calendar` : `calendar/?createdBy=${userid}`);
        return response?.data?.data;
    } catch (error) {
        throw error;
    }
});

const calendarSlice = createSlice({
    name: 'calendarDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendarData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCalendarData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchCalendarData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default calendarSlice.reducer;
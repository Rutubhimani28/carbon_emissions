/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchSmsTemplateData = createAsyncThunk('fetchSmsTemplateData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget(`smstemplate/`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const smsTemplateSlice = createSlice({
    name: 'smsTemplateDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSmsTemplateData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSmsTemplateData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchSmsTemplateData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default smsTemplateSlice.reducer;
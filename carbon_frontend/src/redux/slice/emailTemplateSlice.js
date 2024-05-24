/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchTemplateData = createAsyncThunk('fetchTemplateData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget(`emailtemplate/`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const emailTemplateSlice = createSlice({
    name: 'templateDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTemplateData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTemplateData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchTemplateData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default emailTemplateSlice.reducer;
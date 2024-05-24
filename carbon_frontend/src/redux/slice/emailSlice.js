/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchEmailData = createAsyncThunk('fetchEmailData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget(`email/`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const emailSlice = createSlice({
    name: 'emailDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmailData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEmailData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchEmailData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default emailSlice.reducer;
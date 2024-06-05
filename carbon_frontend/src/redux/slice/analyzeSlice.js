import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAnalyzeData = createAsyncThunk('fetchAnalyzeData', async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('https://oncore-server-public.vercel.app/api/analyze-schedule')

        return response?.data?.payload;
    } catch (error) {
        throw error;
    }
});

const analyzeSlice = createSlice({
    name: 'analyzeData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalyzeData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAnalyzeData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchAnalyzeData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default analyzeSlice.reducer;
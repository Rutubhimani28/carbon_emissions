/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget, apipost } from '../../service/api';

export const fetchDashboardData = createAsyncThunk('fetchDashboardData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget('dashboard/');
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

export const fetchChartData = createAsyncThunk('fetchChartData', async (startDate) => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apipost(`dashboard/chart`, startDate);
        return response?.data;
    } catch (error) {
        throw error;
    }
});

const dashboardSlice = createSlice({
    name: 'dashboardDetails',
    initialState: {
        data: [],
        chartData: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            })

            .addCase(fetchChartData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchChartData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chartData = action.payload;
                state.error = "";
            })
            .addCase(fetchChartData.rejected, (state, action) => {
                state.isLoading = false;
                state.chartData = [];
                state.error = action.error.message;
            });
    },
});

export default dashboardSlice.reducer;
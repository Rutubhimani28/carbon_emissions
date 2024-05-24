/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchPaymentData = createAsyncThunk('fetchPaymentData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget(`payment/`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const paymentSlice = createSlice({
    name: 'paymentDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPaymentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchPaymentData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default paymentSlice.reducer;
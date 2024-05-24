/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchPolicyData = createAsyncThunk('fetchPolicyData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget(`policy/`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const policySlice = createSlice({
    name: 'policyDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPolicyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPolicyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchPolicyData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default policySlice.reducer;
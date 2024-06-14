/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchUserData = createAsyncThunk('fetchUserData', async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
        const response = await apiget("user/");
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const userSlice = createSlice({
    name: 'userDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = "";
        })
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;
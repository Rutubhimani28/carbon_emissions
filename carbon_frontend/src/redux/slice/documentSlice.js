/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchDocumentData = createAsyncThunk('fetchDocumentData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    try {
        const response = await apiget(`document/`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const documentSlice = createSlice({
    name: 'documentDetails',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocumentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDocumentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchDocumentData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default documentSlice.reducer;
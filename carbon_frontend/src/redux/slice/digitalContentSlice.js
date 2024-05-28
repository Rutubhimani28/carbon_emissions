import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchDigitalContentData = createAsyncThunk('fetchDigitalContentData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/digitalContent`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const digitalContentSlice = createSlice({
    name: 'digitalContentData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDigitalContentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDigitalContentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchDigitalContentData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default digitalContentSlice.reducer;